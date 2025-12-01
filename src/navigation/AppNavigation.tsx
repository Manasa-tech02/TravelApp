import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens & Navigators
import WelcomeScreen from '../screens/WelcomeScreen';

// Import Types (This defines the correct screen names: Welcome, Home, Details)
import { RootStackParamList } from './types';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        // We set the type of the stack here using RootStackParamList
        initialRouteName="Welcome"
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right' 
        }}
      >
        {/* 1. Welcome Screen */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        {/* 2. Main App (Tabs) - NAME MUST BE 'HomeScreen' as per types.ts */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        {/* 3. Details Screen */}
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ presentation: 'card' }}
        />

        {/* 4. Sign Up Screen */}
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}