import { NavigatorScreenParams } from '@react-navigation/native';
import { Place } from '../constants/MockData';

// 1. The Bottom Tabs (Home, History, Favorites, Profile)
export type TabParamList = {
  HomeScreen: undefined;
  History: undefined; 
  Favorites: undefined; 
  Profile: undefined;
};

// 2. The Main Stack (Welcome -> Tabs -> Details)
export type RootStackParamList = {
  Welcome: undefined;
  HomeScreen: NavigatorScreenParams<TabParamList>; // This holds the TabNavigator
  Details: { place: Place };
};