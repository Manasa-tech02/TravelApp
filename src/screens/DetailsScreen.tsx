import React from 'react';
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
import { toggleFavorite } from '../redux/slices/favoritesSlice';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const { width, height } = Dimensions.get('window');

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<DetailsScreenRouteProp>();
  const { place } = route.params;

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === place.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(place));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
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
            onPress={handleToggleFavorite}
          >
            <Ionicons 
              name={isFavorite ? "bookmark" : "bookmark-outline"} 
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
          <Text style={[styles.tabText, styles.activeTab]}>Overview</Text>
          <Text style={styles.tabText}>Details</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Ionicons name="time" size={20} color="#666" />
            </View>
            <Text style={styles.statText}>8 hours</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Ionicons name="cloud" size={20} color="#666" />
            </View>
            <Text style={styles.statText}>16 °C</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Ionicons name="star" size={20} color="#666" />
            </View>
            <Text style={styles.statText}>{place.rating}</Text>
          </View>
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
          <TouchableOpacity style={styles.bookButton}>
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
    height: height * 0.5, // Takes up half the screen
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    position: 'absolute',
    top: 40,
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
    backgroundColor: 'rgba(0,0,0,0.6)', // Dark semi-transparent background
    borderRadius: 20,
    padding: 20,
    //backdropFilter: 'blur(10px)', // Works on iOS, ignored on Android
  },
  infoCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
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
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  statIconContainer: {
    marginRight: 8,
  },
  statText: {
    color: '#151313ff',
    fontWeight: '500',
  },
  descriptionContainer: {
    flex: 1,
  },
  descriptionText: {
    color: '#888',
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

export default DetailsScreen;
