# Movie Booking UI (React)

This is a modern, responsive frontend for a movie ticket booking system, built with React and Vite. It provides a seamless 3-step flow for users, from movie selection to seat booking, and is fully integrated with our production [Movie Booking API](https://github.com/your-username/movie-booking-api).

**Live Demo:** `https://your-frontend-app-name.vercel.app`

## Features

* **Full Authentication:** Secure sign-up and login flow using JWT.
* **Persistent Sessions:** Users stay logged in across browser sessions.
* **Step 1: Movie Selection:** A responsive grid of "Now Playing" movies.
* **Step 2: Showtime Selection:** A list of available showtimes for a selected movie.
* **Step 3: Interactive Seat Map:** A visual seat map that differentiates between `available` seats, `booked` (by others) seats, and `mine` (booked by you) seats.
* **Authenticated Booking:** Securely books seats using the user's auth token.
* **Error Handling:** Provides clear feedback for login, registration, or booking failures.

## Technical Documentation

For a detailed breakdown of the system architecture, component hierarchy, and state management, see the full [**DOCUMENTATION.md**](DOCUMENTATION.md).

## Tech Stack

* **React:** For building the component-based UI.
* **Vite:** For a fast, modern development environment.
* **Axios:** As a promise-based HTTP client for all API communication.
* **Custom Hooks:** `useAuth` hook to manage user state and `localStorage` persistence.
* **Central API Client:** A central `api.js` file with an `axios` interceptor to automatically attach the `Authorization` header to all protected requests.

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd movie-booking-ui
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Update API URL:**
    * Open `src/api.js`.
    * Change the `API_URL` to point to your local backend server (e.g., `http://localhost:3000/api`).
4.  **Start the dev server:**
    ```bash
    npm run dev
    ```