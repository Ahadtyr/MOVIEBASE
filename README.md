# MOVIEBASE - Firebase Studio Project

Welcome to MOVIEBASE, a Next.js application built in Firebase Studio. This app lets you explore movies and TV shows, and even get AI-powered recommendations.

## Getting Started

To run the application locally, you'll first need to set up your API keys.

### Configuration

This project requires API keys from two services to function correctly:

1.  **TMDb (The Movie Database):** For all movie and TV show data.
2.  **Google AI (Gemini):** For the "AI Recommends" feature.

**Steps:**

1.  **Create an API Key File:**
    In the root directory of the project, create a new file named `.env.local`.

2.  **Get Your TMDb API Key:**
    *   Visit [The Movie Database (TMDb)](https://www.themoviedb.org/signup) and create a free account.
    *   Go to your account `Settings` -> `API` section to find your key.
    *   Add the following line to your `.env.local` file, replacing `your_key_here` with your actual key:
        ```
        TMDB_API_KEY=your_key_here
        ```

3.  **Get Your Google Gemini API Key:**
    *   Go to [Google AI Studio](https://aistudio.google.com/).
    *   Sign in with your Google account and click "**Get API key**".
    *   Copy the generated key.
    *   Add the following line to your `.env.local` file:
        ```
        GOOGLE_API_KEY=your_key_here
        ```

### Running the App

Once your `.env.local` file is set up, you can run the development server:

```bash
npm run dev
```

Now you can open [http://localhost:9002](http://localhost:9002) to see your app. To get started exploring the code, take a look at `src/app/page.tsx`.
