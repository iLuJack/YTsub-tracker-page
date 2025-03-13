This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment Variables

To run this project, you will need to set up a `.env.local` file in the root of your project directory. This file should contain your YouTube API key:

```
NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual YouTube API key. You can obtain this key from the [Google Cloud Console](https://console.cloud.google.com/).

## Finding a YouTube Channel ID

To find a YouTube channel ID, follow these steps:

1. Go to the YouTube channel page.
2. Look at the URL in your browser's address bar. It will look something like this: `https://www.youtube.com/channel/UCxxxxxxxxxxxx`.
3. The part after `/channel/` is the channel ID. For example, in the URL above, `UCxxxxxxxxxxxx` is the channel ID.

## Track YouTuber Subscription Count

This Next.js page allows you to track a YouTuber's subscription count easily. Simply enter the channel ID and the page will display the current subscription count using the YouTube API.
