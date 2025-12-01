const API_URL = "https://692d4343e5f67cd80a4ac166.mockapi.io/api/v1";



export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}


export interface Place {
  id: string;
  title: string;
  location: string;
  image: string; 
  description: string;
  price: number;
  rating: number;
  latitude: number;  // Added for Weather/Maps
  longitude: number; // Added for Weather/Maps
}


interface ApiPlace {
  id: string;
  name: string;     
  location: string;
  rating: number;
  imageUrl: string;
  description: string;
  price: string;
  latitude: string;  // API sends these as strings usually
  longitude: string;
}


// --- 1. AUTHENTICATION (Login & Signup) ---

// Sign Up: Create a new user
export const registerUser = async (name: string, email: string, password: string) => {
  // First, check if email already exists
  const checkRes = await fetch(`${API_URL}/users?email=${email}`);
  const existingUsers = await checkRes.json();

  if (existingUsers.length > 0) {
    throw new Error("User already exists with this email!");
  }

  // If unique, create the user
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      name, 
      email, 
      password, 
      avatar:"https://www.imagine.art/ai-image-generator"
    }),
  });

  if (!response.ok) throw new Error("Failed to sign up");
  return response.json();
};

// Login: Check if user exists
export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/users?email=${email}`);
  const users: User[] = await response.json();

  const user = users.find((u) => u.password === password);

  if (user) {
    // In React Native (Expo), localStorage doesn't exist. 
    // We usually use AsyncStorage, or just rely on Redux for the session.
    // I'll leave this commented out to prevent errors if you run on mobile.
    localStorage.setItem('user', JSON.stringify(user)); 
    return user;
  } else {
    throw new Error("Invalid email or password");
  }
};


// --- 2. DATA FETCHING (Home Screen) ---

// Get all places for the home screen (supports optional search)
export const getPlaces = async (searchQuery?: string): Promise<Place[]> => {
  let url = `${API_URL}/places`;
  
  // If a search query is provided, append it to the URL
  // MockAPI supports filtering like ?name=Something or ?search=Something (fuzzy)
  if (searchQuery) {
    url += `?search=${encodeURIComponent(searchQuery)}`;
  }

  const response = await fetch(url);
  
  // Handle 404 (Not Found) specifically for search queries
  if (response.status === 404) {
    return [];
  }

  if (!response.ok) throw new Error("Failed to fetch places");
  
  const data: ApiPlace[] = await response.json();
  
  // Map API data to our App's Place structure
  return data.map(item => ({
    id: item.id,
    title: item.name,        // Map API 'name' -> UI 'title'
    location: item.location,
    image: item.imageUrl,    // Map API 'imageUrl' -> UI 'image'
    rating: item.rating,
    // Use the Real Description from API
    description: item.description, 
    // Convert API String price ("432.00") to Number (432)
    price: parseFloat(item.price),
    // Parse coordinates (default to 0 if missing)
    latitude: parseFloat(item.latitude) || 0,
    longitude: parseFloat(item.longitude) || 0
  }));
};

// --- 3. WEATHER API (Open-Meteo - No Key Required) ---
export const fetchWeather = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
    );
    const data = await response.json();
    return data.current_weather.temperature; // Returns number like 15.4
  } catch (error) {
    console.error("Weather fetch failed:", error);
    return null;
  }
};