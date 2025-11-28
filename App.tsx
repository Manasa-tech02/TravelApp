import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your Welcome Screen from the src folder
import WelcomeScreen from './src/screens/WelcomeScreen';

// Create the Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // The NavigationContainer must wrap the entire app
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        {/* You will add Stack.Screen name="HomeScreen" here later */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}