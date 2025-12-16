import React, { useState, useEffect } from 'react';
import { getDistance } from 'geolib';
import { Share } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';


type OverviewScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const { width, height } = Dimensions.get('window');

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const OverviewScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<OverviewScreenRouteProp>();
  const { place, userLocation } = route.params as any;

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === place.id);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  

  // Use temperature and duration from backend (place object)
  const temperature = place.temperature;

  // Calculate distance in km from user location to place
  let distanceText = '';
  if (userLocation && place.latitude && place.longitude) {
    const distance = getDistance(
      { latitude: userLocation.latitude, longitude: userLocation.longitude },
      { latitude: place.latitude, longitude: place.longitude }
    );
    const distanceKm = (distance / 1000).toFixed(2);
    distanceText = `${distanceKm} km`;
  } else {
    distanceText = 'N/A';
  }

  const [activeTab, setActiveTab] = useState<'Overview' | 'Details'>('Overview');



  const handleSharePlace = async () => {
    // You can customize what details to share
    const placeDetails = `Place: ${place.name}\nDescription: ${place.description}\nLocation: (${place.latitude}, ${place.longitude})`;
    try {
      await Share.share({ message: placeDetails });
    } catch (error) {
      // Optionally handle error
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      {/* Top Image Section */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: place.image }} style={styles.image} resizeMode="cover" />
        
        {/* Header Buttons */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={handleSharePlace}
          >
            <Ionicons 
              name="share-social-outline" 
              size={24} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>

        {/* Floating Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.placeTitle}>{place.title}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={16} color="#fff" />
                <Text style={styles.locationText}>{place.location}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceValue}>${place.price}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity onPress={() => setActiveTab('Overview')}>
            <Text style={[styles.tabText, activeTab === 'Overview' && styles.activeTab]}>Overview</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setActiveTab('Details')}>
            <Text style={[styles.tabText, activeTab === 'Details' && styles.activeTab]}>Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <TouchableOpacity style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Ionicons name="map" size={20} color="#060801ff" />
            </View>
            <Text style={styles.statText}>{distanceText}</Text>
          </TouchableOpacity>

          
          <TouchableOpacity style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Ionicons name="cloud" size={20} color="#060801ff" />
            </View>
            <Text style={styles.statText}>
              {temperature} °C
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Ionicons name="star" size={20} color="#060801ff" />
            </View>
            <Text style={styles.statText}>{place.rating}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {place.description}
            {'\n\n'}
            This vast mountain range is renowned for its remarkable diversity in terms of topography and climate. It features towering peaks, active volcanoes, deep canyons, expansive plateaus, and glaciers.
          </Text>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => {
              if (isAuthenticated) {
                navigation.navigate('BookNow');
              } else {
                navigation.navigate('SignUp');
              }
            }}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
            <Ionicons name="paper-plane-outline" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: height * 0.5, 
    width: '100%',
    position: 'relative',
    borderRadius:30,
    // marginBlock:30,
    // margin:10,
    padding:10,
    paddingTop:40,
    // borderRadius:10,

   
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(25, 28, 24, 0.66)', 
    borderRadius: 20,
    padding: 20,
   
  },
  infoCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#ddd',
    marginLeft: 5,
    fontSize: 14,
  },
  priceLabel: {
    color: '#ddd',
    fontSize: 12,
    textAlign: 'right',
    paddingRight:5,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#aaa',
    marginRight: 20,
  },
  activeTab: {
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#d4a373', // Active indicator
    paddingBottom: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  
    
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8edf1ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    opacity:0.4,
  },
  statIconContainer: {
    marginRight: 8,
  },
  statText: {
    color: '#0c0c0cff',
    fontWeight: '500',
  },
  placeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  priceValue: {
    color: '#d4a373', // Gold/Orange color
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  descriptionContainer: {
    flex: 1,
  },
  descriptionText: {
    color: '#706e6eff',
    lineHeight: 22,
    fontSize: 14,
  },
  footer: {
    paddingVertical: 20,
  },
  bookButton: {
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 30,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
   // marginBottom: 40,
  },
});

export default OverviewScreen;
