# XGemini Movie App

XGemini is a dynamic movie app designed to help users explore, track, and manage their favorite movies with ease. It features a comprehensive movie catalog, a personalized watchlist, and a user-friendly interface with secure login, offering a complete movie-tracking experience.

## Key Features

- **User Authentication**: Secure login and signup functionality with token-based authentication (JWT), ensuring user data privacy and session management.
- **Movie Catalog**: Browse and explore movies with detailed information pulled from an external API.
- **Personal Watchlist**: Add movies to a personalized watchlist for easy access and future reference. Users can view a summary of their movie watchlist by date.
- **Data Visualization**: Display a graph of the user’s watchlist activity over time, showing how many movies were added each day.
- **Responsive Design**: Works smoothly across various screen sizes for an optimal viewing experience.

## App Structure

- **Frontend**: Built with React, the frontend manages user interactions and displays movie data fetched from the backend. Key components include:
  - `Browse`: For browsing and searching the movie catalog.
  - `Watchlist`: Allows users to view and manage their watchlist.
  - `Graph`: Displays watchlist activity over time.
  - `Auth`: Handles user login and signup forms, as well as session management.

- **Backend**: A PHP-based API server that handles data storage, authentication, and watchlist management. The backend:
  - Manages user data and watchlist details in the database.
  - Provides token-based authentication using Firebase JWT for secure access.
  - Serves endpoints for adding, retrieving, and summarizing watchlist data.

- **Database**: Stores user information, movie data, and watchlist entries. Each watchlist entry includes a timestamp to track activity over time.

## Libraries and Plugins Used

1. **Frontend (React)**
   - **Axios**: For API requests to the backend.
   - **JWT-decode**: For decoding JSON Web Tokens on the client side.
   - **ApexCharts**: Used to render the watchlist activity graph for a visual summary of user activity.

2. **Backend (PHP)**
   - **Firebase JWT**: Used for token creation and validation to ensure secure access to protected routes.
   - **MySQLi**: For database interaction, used to store and retrieve user and watchlist information.

## Issues and Bugs Encountered

- **CORS Errors**: Initially faced issues with Cross-Origin Resource Sharing (CORS) policies while connecting frontend and backend, resolved by setting proper headers in PHP.
- **Token Expiry**: Implemented a token refresh mechanism to handle expired tokens and ensure seamless user experience without frequent logouts.
- **Data Inconsistencies**: Faced some issues with date formatting for watchlist activity tracking, fixed by standardizing timestamps in SQL queries and frontend data handling.
- **API Rate Limits**: The external API used for movie data has rate limits, which caused occasional loading issues; caching strategies may be considered for future improvements.

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Code4Hacker/movie-webapp.git
   cd movie-app
   npm install
   npx run dev
## Screenshort for the Application
Homepage or Browsing Page
<img width="1680" alt="Screenshot 2024-11-14 at 12 50 42" src="https://github.com/user-attachments/assets/7baa1531-c787-4238-803a-309ad3438b09">
<img width="1680" alt="Screenshot 2024-11-14 at 12 52 49" src="https://github.com/user-attachments/assets/fe0019f0-c5d8-4f9e-a5b3-4a0918e66246">
<img width="1680" alt="Screenshot 2024-11-14 at 12 53 26" src="https://github.com/user-attachments/assets/7b8084aa-5cc9-4833-970e-5550a1bd9702">

View All Page:
<img width="1680" alt="Screenshot 2024-11-14 at 13 03 09" src="https://github.com/user-attachments/assets/cf30bc31-cac1-4585-9342-a48b30bc556f">

Dashboard:
   
<img width="1680" alt="Screenshot 2024-11-14 at 13 04 08" src="https://github.com/user-attachments/assets/4d083734-d1ef-4c7a-b6a6-99435e18f559">

UPDATE PASSWORD:
<img width="519" alt="Screenshot 2024-11-14 at 13 04 32" src="https://github.com/user-attachments/assets/7f2c8e31-306f-4bde-b293-db58ca10cd2b">


