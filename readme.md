# Quiz Application

A web-based quiz application that fetches quiz data from a backend API and displays it to users with various interactive features such as multiple-choice questions, scoring, and more.

## Project Overview

- **Frontend**: React-based application that fetches quiz data from the backend, displays questions and options, and handles user inputs.
- **Backend**: API developed using Node.js/Express (or any backend tech stack of your choice) to serve quiz data in JSON format.

## Features

- Quiz Metadata: Displays quiz title, topic, description, duration, and other metadata.
- Question Rendering: Displays multiple-choice questions with answer options.
- Answer Selection: Allows users to select answers, track selections, and submit the quiz.
- Scoring: Calculates scores based on correct answers, considering positive and negative marks.

---

## Backend (API)

### Requirements

- Node.js (version 14 or higher)
- Express (or any backend framework you prefer)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quiz-app.git
   ```

2. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Configure the environment variables if needed (e.g., database connection, API keys, etc.) in `.env`.

5. Start the server:
   ```bash
   npm start
   ```

   The backend will be available at `http://localhost:5000`.

### API Endpoints

#### Get Quiz Data

- **URL**: `/api/quiz`
- **Method**: `GET`
- **Description**: Fetches all quiz data, including metadata, questions, and options.

---

## Frontend (React Application)

### Requirements

- Node.js (version 14 or higher)
- React (version 18 or higher)
- Axios (for API requests)
- Tailwind CSS (for styling, optional)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quiz-app.git
   ```

2. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

### Frontend Components

- **App.tsx**: The main React component that fetches and displays quiz data.
- **QuizDisplay.tsx**: Handles the display of questions and options.
- **ScoreCard.tsx**: Displays the user's score after quiz submission.

### Fetching Quiz Data

In `App.tsx`, the quiz data is fetched using Axios from the backend API:


## Folder Structure

Here’s a basic folder structure for both backend and frontend:

```
quiz-app/
├── backend/                    # Backend folder (API)
│   ├── controllers/            # Controllers for API endpoints
│   ├── routes/                 # API routes
│   ├── models/                 # Database models (if needed)
│   ├── server.js               # Main server file
│   └── .env                    # Environment variables
└── frontend/                   # Frontend folder (React app)
    ├── src/
    │   ├── components/         # React components (QuizDisplay, ScoreCard, etc.)
    │   ├── App.tsx             # Main App component
    │   ├── index.tsx           # Entry point for React app
    └── tailwind.config.js       # Tailwind CSS config (if using Tailwind)
```

---

## Testing

### Backend Testing

You can use **Postman** or **Insomnia** to test the API endpoints.

1. Test the `/api/quiz` endpoint by sending a GET request to `http://localhost:5000/api/quiz`.

### Frontend Testing

In the frontend folder, you can use **Jest** and **React Testing Library** for unit tests.

```bash
npm run test
```

---

## Deployment

### Backend Deployment

To deploy the backend, you can use platforms like **Heroku**, **AWS**, or **DigitalOcean**. 

1. Push the code to your GitHub repository.
2. Link the repository to your hosting platform.
3. Set up any necessary environment variables (API keys, database connections).
4. Deploy the app.

### Frontend Deployment

For the frontend, you can deploy to platforms like **Netlify**, **Vercel**, or **GitHub Pages**.

1. Push the code to your GitHub repository.
2. Link the repository to your hosting platform.
3. Deploy the app.

---