'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Youtuber {
  id: string;
  name: string;
  subscribers: number | null;
  displayedSubscribers: number | null;
  loading: boolean;
  thumbnailUrl?: string;
}

interface YouTubeApiResponse {
  items?: {
    statistics: {
      subscriberCount: string;
      videoCount: string;
      viewCount: string;
    };
    snippet?: {
      thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
      };
    };
  }[];
}

export default function YouTubeMonitor() {
  const [youtubers, setYoutubers] = useState<Youtuber[]>([
    { id: 'UC3LBFXbWtEBdOOUb8-qJm9Q', name: '眾量級CROWD', subscribers: null, displayedSubscribers: null, loading: true },
    { id: 'UCjMBtSoVSmqE2jTqwKh3ttg', name: 'Andy老師', subscribers: null, displayedSubscribers: null, loading: true },
    { id: 'UCMHrocT83hHvhQdai31QZ4g', name: '秘月期POPOO', subscribers: null, displayedSubscribers: null, loading: true },
  ]);
  
  // Replace with your actual API key
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const updatedYoutubers = [...youtubers];
        
        for (let i = 0; i < youtubers.length; i++) {
          const youtuber = youtubers[i];
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${youtuber.id}&key=${API_KEY}`
          );
          
          const data: YouTubeApiResponse = await response.json();
          if (data.items && data.items.length > 0) {
            const newCount = parseInt(data.items[0].statistics.subscriberCount);
            updatedYoutubers[i] = {
              ...youtuber,
              subscribers: newCount,
              displayedSubscribers: youtuber.subscribers ?? newCount,
              thumbnailUrl: data.items[0].snippet?.thumbnails.medium.url,
              loading: false
            };
          }
        }
        
        setYoutubers(updatedYoutubers);
      } catch (error) {
        console.error('Error fetching YouTube data:', error);
      }
    };
    
    fetchSubscribers();
    
    // Set up polling every 5 minutes
    const intervalId = setInterval(fetchSubscribers, 5 * 60 * 1000);
    
    // Add animation interval
    const animationInterval = setInterval(() => {
      setYoutubers(currentYoutubers => {
        return currentYoutubers.map(youtuber => {
          if (!youtuber.subscribers || !youtuber.displayedSubscribers) return youtuber;

          const diff = youtuber.subscribers - youtuber.displayedSubscribers;
          if (Math.abs(diff) < 1) return youtuber;

          // Increment by roughly 1/300th of the difference (takes ~5 minutes to catch up)
          const increment = diff / 300;
          const newDisplayed = youtuber.displayedSubscribers + increment;

          return {
            ...youtuber,
            displayedSubscribers: newDisplayed
          };
        });
      });
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId);
      clearInterval(animationInterval);
    };
  }, []);
  
  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-amber-800">
        YouTube Subscription Monitor
      </h1>
      
      <div className="space-y-4">
        {youtubers.map((youtuber) => (
          <Card key={youtuber.id} className="overflow-hidden border-2 border-amber-100 shadow-lg">
            <CardHeader className="bg-amber-100 text-amber-800 py-3 px-4">
              <h2 className="text-xl font-semibold">{youtuber.name}</h2>
            </CardHeader>
            <CardContent className="p-4 bg-amber-50">
              <div className="flex items-center space-x-4">
                {youtuber.thumbnailUrl ? (
                  <img 
                    src={youtuber.thumbnailUrl} 
                    alt={`${youtuber.name} channel`}
                    className="w-20 h-20 rounded-full border-2 border-amber-200"
                  />
                ) : (
                  <Skeleton className="w-20 h-20 rounded-full" />
                )}
                
                <div className="flex-1">
                  <p className="text-sm text-amber-700 font-medium">Subscribers</p>
                  {youtuber.loading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    <p className="text-3xl font-bold text-amber-900">
                      {youtuber.displayedSubscribers ? Math.round(youtuber.displayedSubscribers).toLocaleString() : 0}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <a 
                  href={`https://www.youtube.com/channel/${youtuber.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-amber-200 text-amber-800 rounded-md hover:bg-amber-300 transition-colors"
                >
                  <span>Visit Channel</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-amber-50 rounded-lg shadow-sm border border-amber-100">
        <p className="text-center text-sm text-amber-700">
          Data refreshes automatically every 5 minutes
        </p>
        <p className="text-center text-xs text-amber-600 mt-1">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}