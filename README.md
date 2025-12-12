
# TravelApp

A React Native (Expo) application for discovering and saving travel places, with live location support, distance calculation, and backend API integration.

## Developer Role
This project demonstrates skills for a Junior React Native Developer / Mobile App Developer (Fresher/Entry Level).

## Tools & Libraries Used
- Expo (development, build, device preview)
- React Native (core framework)
- TypeScript (type safety)
- Redux Toolkit & Redux Toolkit Query (state management, API fetching)
- Axios (HTTP requests)
- Expo Location (user location)
- React Navigation (screen navigation)
- @expo/vector-icons (Ionicons for UI icons)
- geolib (distance calculation)
- React Native core components (View, Text, FlatList, etc.)
- Alert (error and permission dialogs)
- SafeAreaView (device safe area handling)
- ActivityIndicator (loading spinners)

Planned/Optional:
- Firebase (backend/auth/data)
- expo-notifications (push notifications)
- Animated (UI animations)


## Features
- User registration and login
- Fetch and display places from backend API
- Live user location (with permission)
- Calculate and display distance from user to place
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
- Allow location permission for nearby places and distance calculation.
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
