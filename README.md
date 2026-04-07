# Movie Search App

A Next.js application that allows users to search for movies using the TMDB (The Movie Database) API.

## Features

- **Search Movies** - Search for movies by title
- **Popular Movies** - Display popular movies on the homepage
- **Movie Details** - View detailed information about each movie including:
  - Poster and backdrop images
  - Title, overview, and release date
  - Rating, runtime, and genres
- **Pagination** - Navigate through multiple pages of results

## Getting Started

1. Create a `.env.local` file in the root directory with:
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key
   NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

2. Get a TMDB API key from: https://www.themoviedb.org/settings/api

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS v4
- TypeScript
- TMDB API