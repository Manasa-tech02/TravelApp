# TravelApp

A React Native (Expo) application for discovering and saving travel places, with live location support and backend API integration.

## Features
- User registration and login
- Fetch and display places from backend API
- Live user location (with permission)
- Sort places by most viewed, latest, or nearby
- Save favorites and view history
- Profile management

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Manasa-tech02/TravelApp.git
   ```
2. Navigate to the project folder:
   ```sh
   cd TravelApp
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the Expo development server:
   ```sh
   npm start
   ```

## API Endpoints
Base URL: `https://692d4343e5f67cd80a4ac166.mockapi.io/api/v1`

- `GET /places` — Fetch all places
- `GET /places?search=...` — Search places
- `GET /places?sortBy=views&order=desc` — Most viewed
- `GET /places?sortBy=createdAt&order=desc` — Latest
- `GET /users?email=...` — Find user by email
- `POST /users` — Register new user

## Usage
- Open the app in Expo Go or build an APK for Android.
- Register or log in to access features.
- Allow location permission for nearby places.
- Use the Home screen to browse, search, and sort places.
- Save favorites and view your history.

## Testing
- Manual: Use Expo Go to test UI and features.
- Automated: Set up Jest and React Native Testing Library for unit and integration tests.
- API: Use Postman to test backend endpoints.

## Folder Structure
```
TravelApp/
├── app.json
├── App.tsx
├── eas.json
├── index.ts
├── package.json
├── tsconfig.json
├── assets/
├── src/
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── navigation/
│   ├── redux/
│   ├── screens/
│   ├── services/
│   └── types/
```

## Documentation
- Written in Markdown (`README.md`)
- For UI component documentation, consider using Storybook

## License
MIT
