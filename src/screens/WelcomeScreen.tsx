import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 1. Define the Navigation Types locally
// This tells TypeScript that "HomeScreen" is a valid destination
type RootStackParamList = {
  Welcome: undefined;
  HomeScreen: undefined; 
};

// Define the specific navigation prop for this screen
type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  // 2. Initialize the navigation hook
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

    // Auto-navigate to HomeScreen after 2 seconds
    useEffect(() => {
      const timer = setTimeout(() => {
        //navigation.replace('HomeScreen');
      }, 2000); // 2000ms = 2 seconds
      return () => clearTimeout(timer);
    }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Set Status Bar to Light (White text) to contrast with dark background */}
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* 3. Gradient Background */}
      <LinearGradient
        // Colors: Lighter Blue (Top) -> Deep Dark Blue (Bottom)
        colors={['#0066CC', '#001A4D']} 
        locations={[0.1, 0.9]} 
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          
          {/* 4. Logo Section: "Travel" + Globe Icon */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Travel</Text>
            <Ionicons name="earth" size={45} color="white" style={styles.logoIcon} />
          </View>

          {/* 5. The Navigation Trigger */}
          {/* This Text acts as the button to go to HomeScreen */}
          <TouchableOpacity 
            activeOpacity={0.7} 
              // onPress removed for auto navigation
            style={styles.touchableArea}
          >
            <Text style={styles.mainText}>
              Find Your Dream {'\n'}Destination With Us
            </Text>
          </TouchableOpacity>

        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 40, 
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40, // Spacing between Logo and the Text below it
    gap: 8, 
  },
  logoText: {
    fontSize: 48,
    color: '#FFFFFF',
    fontWeight: 'bold',
    // Italic style mimics the design in your image
    fontStyle: 'italic', 
    // Uses serif font to look elegant
    fontFamily: Platform.OS === 'ios' ? 'Georgia-BoldItalic' : 'serif',
  },
  logoIcon: {
    marginTop: 8, // Visual adjustment to align globe with text
  },
  touchableArea: {
    padding: 10, // Increases the clickable area
  },
  mainText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 30, 
    letterSpacing: 0.5,
  },
});