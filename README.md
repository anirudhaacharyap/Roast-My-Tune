# 🔥 RoastMyTune
Try it out here: https://roast-my-tune.vercel.app/

**Let AI judge your terrible music taste.**

RoastMyTune connects to your Spotify account, analyzes your listening history (Top Artists, Tracks, Genres), and uses Google's Gemini AI to generate a personalized, brutal roast of your music personality.

![RoastMyTune Screenshot](https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2574&auto=format&fit=crop)

---

## 🚀 Features

*   **Spotify Integration**: Secure OAuth login to fetch your real listening data.
*   **AI Analysis**: Uses Google Gemini to analyze deep cuts, guilty pleasures, and basic-ness.
*   **Taste Score**: Algorithms calculate a numerical score of your music taste (0-100).
*   **AI Persona & Wrapped**: Assigns you a specific persona (e.g., "Sad 2014 Indie Kid") and shows your Top 5 Albums.
*   **Dynamic UI**: Animated backgrounds, interactive charts, and brutal loading messages.
*   **Shareable Cards**: Generate an Instagram-ready image of your roast to share with friends.

---

## 🛠️ Tech Stack

### Frontend (Client)
*   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Language**: TypeScript
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Components**: [shadcn/ui](https://ui.shadcn.com/)
*   **Animations**: Framer Motion
*   **Deployment**: [Vercel](https://vercel.com/)

### Backend (Server)
*   **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11+)
*   **AI Engine**: [Google Gemini Pro](https://deepmind.google/technologies/gemini/)
*   **Data Source**: [Spotify Web API](https://developer.spotify.com/documentation/web-api)
*   **Deployment**: [Railway](https://railway.app/)

### Services
*   **Authentication**: [Supabase Auth](https://supabase.com/)
*   **Database**: None (Stateless architecture - we don't store your music data).

---

## 💻 Local Developement

Follow these steps to run the project locally.

### 1. Prerequisites
*   Node.js (v18+)
*   Python (v3.10+)
*   Spotify Developer Account (Client ID & Secret)
*   Supabase Project (URL & Anon Key)
*   Google AI Studio Key (Gemini)

### 2. Clone the Repository
```bash
git clone https://github.com/anirudhaacharyap/Roast-My-Tune.git
cd Roast-My-Tune
```

### 3. Backend Setup
Navigate to the `backend` folder and set up the Python environment.

```bash
cd backend
# Create virtual environment
python -m venv venv
# Activate it (Windows)
.\venv\Scripts\activate
# Activate it (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Configure Backend Environment (`backend/.env`):**
Create a `.env` file in `backend/` and add:
```env
GEMINI_API_KEY=your_gemini_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:5173/loading
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

**Run the Backend:**
```bash
uvicorn app.main:app --reload
# Runs on http://localhost:8000
```

### 4. Frontend Setup
Open a new terminal and navigate to the `frontend` folder.

```bash
cd frontend
npm install
```

**Configure Frontend Environment (`frontend/.env`):**
Create a `.env` file in `frontend/` and add:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
# Point to your local backend
VITE_API_URL=http://localhost:8000
```

**Run the Frontend:**
```bash
npm run dev
# Runs on http://localhost:5173 (or 8080 depending on vite config)
```

---

## 🌐 Deployment Logic

### Backend (Railway)
1.  Connect your GitHub repo to Railway.
2.  Set **Root Directory** to `backend`.
3.  Set **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4.  Add all variables from `backend/.env` to Railway Variables.

### Frontend (Vercel)
1.  Connect your GitHub repo to Vercel.
2.  Set **Root Directory** to `frontend`.
3.  Add variables from `frontend/.env` to Vercel Environment Variables.
    *   **Crucial**: Change `VITE_API_URL` to your **Deployed Railway URL** (e.g., `https://your-app.up.railway.app`).
4.  **SPA Rewrites**: Ensure `frontend/vercel.json` exists to handle routing:
    ```json
    { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
    ```

### 🔧 Troubleshooting Common Errors

**1. "Hold Up" / Access Denied**
*   **Cause**: User clicked "Cancel" on Spotify login OR Redirect URL mismatch.
*   **Fix**: Ensure your Vercel URL is exactly matched in Supabase Redirect URLs.

**2. App works on WiFi but fails on Mobile Data (Jio/etc)**
*   **Cause**: Some ISPs block `*.up.railway.app` domains.
*   **Fix (Recommended): Use Vercel Proxy**
    1.  We have configured `vercel.json` to proxy API requests.
    2.  Go to **Vercel Dashboard** -> **Settings** -> **Environment Variables**.
    3.  Edit `VITE_API_URL`.
    4.  Set the value to: `/` (just a forward slash).
    5.  Redeploy (or wait for next build).
    *   *Why?* This makes the Frontend talk to Vercel, and Vercel talks to Railway. No ISP blocking!

### Authentication (Supabase)
1.  Go to **Supabase Dashboard** -> Authentication -> URL Configuration.
2.  Add your Vercel URL to **Redirect URLs**:
    *   `https://your-vercel-app.vercel.app/**`
    *   `http://localhost:5173/**` (for local dev)

---

## 🤝 Contributing
Feel free to fork this repository and submit Pull Requests.
Please ensure your changes do not break the "Stateless" nature of the backend (we try to avoid storing user data).

## 📄 License
MIT License. Roast responsibly.
