import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { toggleFavorite } from '../redux/slices/favoritesSlice';
import { Place } from '../services/types';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

export default function FavoritesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  const renderFavoriteItem = ({ item }: { item: Place }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('Details', {
            place: item,
            userLocation: null, 
          })
        }
        style={styles.cardContainer}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />

        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>

            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color="#888" />
              <Text style={styles.cardLocation}>{item.location}</Text>
            </View>

            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => dispatch(toggleFavorite(item))}
          >
            <Ionicons name="heart" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={40} color="#DDD" />
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubText}>
            Start exploring and add places you love!
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  header: { padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold' },

  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  cardImage: { width: '100%', height: 180 },
  cardContent: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardLocation: { fontSize: 14, color: '#888' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontWeight: 'bold' },

  heartButton: {
    padding: 4,
    backgroundColor: '#FFF0F0',
    borderRadius: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: { fontSize: 20, fontWeight: 'bold', color: '#888' },
  emptySubText: { fontSize: 14, color: '#AAA', marginTop: 8 },
});
