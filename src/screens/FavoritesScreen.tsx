import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StatusBar,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Redux
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { toggleFavorite } from '../redux/slices/favoritesSlice';

// Types
import { Place } from '../constants/MockData';

type RootStackParamList = {
  Details: { place: Place };
};

const { width } = Dimensions.get('window');

export default function FavoritesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  const renderFavoriteItem = ({ item }: { item: Place }) => {
    return (
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Details', { place: item })}
        style={styles.cardContainer}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        
        {/* Overlay Content */}
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

          {/* Heart Icon (to remove from favorites) */}
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
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={80} color="#DDD" />
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubText}>Start exploring and add places you love!</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 15,
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  cardLocation: {
    fontSize: 14,
    color: '#888',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  heartButton: {
    padding: 8,
    backgroundColor: '#FFF0F0',
    borderRadius: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888',
    marginTop: 20,
  },
  emptySubText: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
    marginTop: 8,
  },
});
