// src/navigation/AppNavigation.tsx
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import OverviewScreen from '../screens/OverviewScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookNowScreen from '../screens/BookNowScreen';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';



export type RootStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  Home: undefined;
  Details: undefined;
  Profile: undefined;
  BookNow: undefined;
  ProfileSettings: undefined;
 
  
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        
        <Stack.Screen name="Home" component={HomeScreen} />
        
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Details" component={OverviewScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="BookNow" component={BookNowScreen} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
