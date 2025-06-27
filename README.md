# MOVIEBASE - Firebase Studio Project

Welcome to MOVIEBASE, a Next.js application built in Firebase Studio. This app lets you explore movies and TV shows, and even get AI-powered recommendations. This guide will help you run the project locally and deploy it to Netlify.

## Getting Started Locally

To run the application locally, you'll first need to set up your API keys.

### Local Configuration

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

### Running the Development Server

Once your `.env.local` file is set up, you can run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) to see your app.

---

## Deploying to Netlify

To deploy your website, we recommend using [Netlify](https://www.netlify.com/). The easiest way is to connect it to a Git repository.

### Step 1: Push Your Code to a Git Repository

Create a new repository on a service like [GitHub](https://github.com/), [GitLab](https://gitlab.com/), or [Bitbucket](https://bitbucket.org/). Then, initialize a git repository in your project folder and push your code.

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GIT_REPOSITORY_URL
git push -u origin main
```

### Step 2: Deploy on Netlify

1.  **Sign up or Log in** to your [Netlify](https://app.netlify.com/) account.
2.  Click the **"Add new site"** button and select **"Import an existing project"**.
3.  **Connect to your Git provider** (GitHub, GitLab, etc.) and authorize access.
4.  **Select your repository** from the list.
5.  Netlify should automatically detect that this is a Next.js project. The build settings are already configured in `netlify.toml`, so you can proceed.
6.  Before deploying, click **"Show advanced"** and then **"Add environment variables"**.

### Step 3: Add Environment Variables

You must add your API keys to Netlify so your live site can use them.

*   Add a variable with the key `TMDB_API_KEY` and your TMDb API key as the value.
*   Add another variable with the key `GOOGLE_API_KEY` and your Gemini API key as the value.

### Step 4: Deploy Site

Click the **"Deploy site"** button. Netlify will start building and deploying your application. Once finished, you'll have a live URL for your website!
