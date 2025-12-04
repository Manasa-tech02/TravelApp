import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Place } from '../services/types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

interface PlaceCardProps {
  item: Place;
  isFavorite: boolean;
  onPress: (place: Place) => void;
  onToggleFavorite: (place: Place) => void;
}

const PlaceCard = React.memo(({ item, isFavorite, onPress, onToggleFavorite }: PlaceCardProps) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={() => onPress(item)}
      style={styles.cardContainer}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.cardImage} 
      />

      <TouchableOpacity 
        style={styles.cardIconContainer}
        onPress={() => onToggleFavorite(item)}
      >
         <Ionicons 
           name={isFavorite ? "heart" : "heart-outline"} 
           size={20} 
           color={isFavorite ? "red" : "white"} 
         />
      </TouchableOpacity>

      <View style={styles.cardOverlay}>
         <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
         
         <View style={styles.cardFooterRow}>
           <View style={styles.cardLocationRow}>
             <Ionicons name="location-outline" size={14} color="#D1D1D1" />
             <Text style={styles.cardLocation} numberOfLines={1}>{item.location}</Text>
           </View>

           <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
           </View>
         </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardIconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(20, 30, 40, 0.75)', 
    padding: 16,
    borderRadius: 18,
    paddingRight:5,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  cardLocation: {
    color: '#D1D1D1',
    fontSize: 13,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight:5,
  },
  ratingText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
    paddingRight:5,
  },
});

export default PlaceCard;
