import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import WelcomeScreen from '../screens/WelcomeScreen';


import { RootStackParamList } from './types';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
       
        initialRouteName="Welcome"
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right' 
        }}
      >
       
        <Stack.Screen name="Welcome" component={WelcomeScreen} />

       
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

       
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ presentation: 'card' }}
        />

      
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}