# EduLLM - AI-Powered Learning Assistant

An educational website that provides AI tutoring across multiple subjects using OpenAI's GPT API.

**Live Site:** https://edu-llm-green.vercel.app

## Overview

EduLLM is a web application that allows users to learn various subjects through conversational AI. Users select a subject from a carousel and engage in a chat-based learning experience with an AI tutor specialized in that topic.

### Subjects Available
- **History** - Civilizations, events, and historical figures
- **Mathematics** - Algebra, calculus, geometry, and more
- **Physics** - Mechanics, thermodynamics, and quantum physics
- **Biology** - Life sciences, genetics, and ecosystems

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite |
| Styling | Vanilla CSS |
| Backend | Vercel Serverless Functions |
| AI | OpenAI GPT-3.5-turbo |
| Hosting | Vercel |
| CI/CD | Vercel Git Integration |

## Project Structure

```
edu-llm/
├── api/
│   └── chat.js              # Serverless function - proxies requests to OpenAI
├── src/
│   ├── components/
│   │   ├── SubjectCarousel.jsx   # Subject selection carousel
│   │   └── ChatInterface.jsx     # Chat UI with message history
│   ├── App.jsx              # Main application component
│   ├── App.css              # All application styles
│   └── main.jsx             # React entry point
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── vercel.json              # Vercel deployment settings
└── package.json             # Dependencies and scripts
```

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│   Vercel    │────▶│   OpenAI    │
│  (React UI) │◀────│  Serverless │◀────│     API     │
└─────────────┘     └─────────────┘     └─────────────┘
```

1. **User** selects a subject and types a question
2. **Frontend** sends request to `/api/chat` endpoint
3. **Serverless function** adds the API key and forwards to OpenAI
4. **OpenAI** returns a response with educational content
5. **Frontend** displays the AI tutor's response

### Why a Backend Proxy?

The API key is stored as a server-side environment variable, not in the frontend code. This prevents users from viewing or stealing the API key through browser developer tools.

## Key Components

### `/api/chat.js`
Serverless function that:
- Receives chat messages and selected subject from frontend
- Constructs a system prompt for subject-specific tutoring
- Calls OpenAI API with secure API key
- Returns AI response to frontend

### `SubjectCarousel.jsx`
Displays the four subject cards in a horizontally scrollable carousel. Each card shows an icon, subject name, and brief description.

### `ChatInterface.jsx`
Manages the chat experience:
- Displays message history (user and assistant messages)
- Handles user input and form submission
- Shows loading animation during API calls
- Auto-scrolls to latest messages

## Local Development

### Prerequisites
- Node.js 18+
- OpenAI API key

### Setup

```bash
# Clone the repository
git clone https://github.com/gmontero10/edu-llm.git
cd edu-llm

# Install dependencies
npm install

# Create environment file
echo "OPENAI_API_KEY=your-api-key-here" > .env

# Start development server
vercel dev
```

The app will be available at `http://localhost:3000`

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (frontend only) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `vercel dev` | Full local development with serverless functions |

## Deployment

The project is configured for automatic deployment via Vercel:

1. **Push to `main`** → Triggers production deployment
2. **Push to other branches** → Creates preview deployment

### Environment Variables

Set in Vercel dashboard or via CLI:

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key for GPT access |

## Styling

The app features a dark theme with gradient accents:
- Background: Dark blue gradient (`#1a1a2e` to `#16213e`)
- Accent: Cyan to purple gradient (`#00d4ff` to `#7b2cbf`)
- Cards: Glassmorphism effect with backdrop blur

Fully responsive design adapts to mobile and desktop viewports.

## License

MIT
