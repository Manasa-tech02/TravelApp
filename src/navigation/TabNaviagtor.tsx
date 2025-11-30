import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform } from 'react-native';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

// Import Types
import { TabParamList } from './types';

// Placeholder screens for tabs not yet built
const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>{name} Screen</Text>
  </View>
);

// Define stable components outside the navigator
const HistoryScreen = () => <PlaceholderScreen name="History" />;
const ProfileScreen = () => <PlaceholderScreen name="Profile" />;

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, 
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0, // Android shadow
          shadowOpacity: 0, // iOS shadow
          height: Platform.OS === 'ios' ? 85 : 70,
          paddingTop: 10,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
        },
        tabBarActiveTintColor: '#FF3D00', // Red/Orange for active
        tabBarInactiveTintColor: '#B0B0B0', // Grey for inactive
      }}
    >
      <Tab.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <View style={styles.iconContainer}>
              <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
      
      <Tab.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
             <View style={styles.iconContainer}>
               <Ionicons name="time-outline" size={24} color={color} />
               {focused && <View style={styles.activeDot} />}
             </View>
          ),
        }}
      />

      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <View style={styles.iconContainer}>
              <Ionicons name={focused ? "heart" : "heart-outline"} size={24} color={color} />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />

      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="person-outline" size={24} color={color} />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: { alignItems: 'center', justifyContent: 'center', height: 40 },
  activeDot: { 
    width: 5, 
    height: 5, 
    borderRadius: 2.5, 
    backgroundColor: '#FF3D00', 
    position: 'absolute',
    bottom: -8 
  },
  placeholderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9F9F9' },
  placeholderText: { fontSize: 18, color: '#888' },
});