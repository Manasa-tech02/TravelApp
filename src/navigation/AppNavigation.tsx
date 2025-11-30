import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens & Navigators
import WelcomeScreen from '../screens/WelcomeScreen';
import TabNavigator from './TabNaviagtor';

// Import Types (This defines the correct screen names: Welcome, Home, Details)
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Temporary Placeholder for Details Screen 
const DetailsPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
    <Text>Details Screen</Text>
  </View>
);

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
        <Stack.Screen name="HomeScreen" component={TabNavigator} />

        {/* 3. Details Screen */}
        <Stack.Screen 
          name="Details" 
          component={DetailsPlaceholder} 
          options={{ presentation: 'card' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}