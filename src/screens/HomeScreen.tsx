import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Image, 
  FlatList, 
  TouchableOpacity, 
  StatusBar,
  ScrollView,
  Platform,
  Dimensions,
  ActivityIndicator, 
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// --- Redux Imports ---
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleFavorite } from '../redux/slices/favoritesSlice';
import { addSearchTerm } from '../redux/slices/historySlice';
import { fetchPlaces } from '../redux/slices/placesSlice'; // Use the Thunk

// --- Types ---
import { Place } from '../services/types'; 
import { SortCategory } from '../services/placesService'; // Import the type

// --- Navigation & Screens ---
import FavoritesScreen from './FavoritesScreen';
import HistoryScreen from './HistoryScreen';
import ProfileScreen from './ProfileScreen';
import { TabParamList } from '../navigation/types';

// --- Define Categories with correct IDs for the API ---
const CATEGORIES: { id: SortCategory; name: string }[] = [
  { id: 'most_viewed', name: 'Most Viewed' },
  { id: 'nearby', name: 'Nearby' },
  { id: 'latest', name: 'Latest' },
];

type RootStackParamList = {
  Details: { place: Place };
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

function HomeContent() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  
  // --- 1. Use Redux State instead of Local State ---
  const { items: places, loading } = useAppSelector((state) => state.places);
  const favorites = useAppSelector((state) => state.favorites.items);
  const user = useAppSelector((state) => state.auth.user);
  
  // State for UI filters
  const [activeCategory, setActiveCategory] = useState<SortCategory>('most_viewed');
  const [searchText, setSearchText] = useState('');


  const loadData = useCallback(() => {
    
    dispatch(fetchPlaces({
      category: activeCategory,
      searchQuery: searchText,
   
      userLat: 37.7749, 
      userLng: -122.4194
    }));
  }, [activeCategory, searchText, dispatch]);


  useEffect(() => {
    loadData();
  }, [activeCategory]);


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]); 

 
  useFocusEffect(
    useCallback(() => {
      
    }, [loadData])
  );

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const handleSearchSubmit = () => {
    const trimmedText = searchText.trim();
    if (trimmedText) {
      loadData();
      dispatch(addSearchTerm(trimmedText));
    }
  };

  const renderCategory = ({ item }: { item: { id: SortCategory; name: string } }) => {
    const isActive = activeCategory === item.id;
    return (
      <TouchableOpacity 
        onPress={() => setActiveCategory(item.id)}
        style={[
          styles.categoryItem, 
          isActive && styles.categoryItemActive
        ]}
      >
        <Text style={[
          styles.categoryText, 
          isActive && styles.categoryTextActive
        ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPlaceCard = ({ item }: { item: Place }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    return (
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Details', { place: item })}
        style={styles.cardContainer}
      >
        <Image 
          source={{ uri: item.image }} 
          style={styles.cardImage} 
        />

        <TouchableOpacity 
          style={styles.cardIconContainer}
          onPress={() => dispatch(toggleFavorite(item))}
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
  };

  const renderSearchResultItem = ({ item }: { item: Place }) => (
    <TouchableOpacity 
      style={styles.searchResultItem}
      onPress={() => navigation.navigate('Details', { place: item })}
    >
      <View style={styles.searchResultIcon}>
        <Ionicons name="location-sharp" size={20} color="#666" />
      </View>
      <View>
        <Text style={styles.searchResultTitle}>{item.title}</Text>
        <Text style={styles.searchResultLocation}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={styles.headerTitle}>Hi, {user?.name || 'Guest'}</Text>
              <Text style={{fontSize: 28}}>👋</Text>
            </View>
            <Text style={styles.headerSubtitle}>Explore the world</Text>
          </View>
          
          <View style={styles.avatarContainer}>
           <Text style={styles.avatarText}>
             {getInitials(user?.name || 'Guest')}
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <Ionicons name="search-outline" size={20} color="#A0A0A0" style={{ marginRight: 10 }} />
            <TextInput 
              placeholder="Search places" 
              placeholderTextColor="#A0A0A0"
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
            />
          </View>
          <View style={styles.filterDivider} />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#A0A0A0" />
          </TouchableOpacity>
        </View>

        {/* Conditional Rendering: Search Results vs Home Content */}
        {searchText.length > 0 ? (
          <View style={styles.searchResultsContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#FF3D00" style={{marginTop: 20}} />
            ) : (
              <FlatList
                data={places}
                renderItem={renderSearchResultItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false} 
                ListEmptyComponent={
                  <Text style={styles.noResultsText}>No places found matching "{searchText}"</Text>
                }
              />
            )}
          </View>
        ) : (
          <>
            {/* Section Header */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular places</Text>
              <TouchableOpacity onPress={() => loadData()}>
                <Text style={styles.viewAllText}>Refresh</Text>
              </TouchableOpacity>
            </View>

            {/* Categories */}
            <View style={styles.categoriesContainer}>
              <FlatList
                horizontal
                data={CATEGORIES}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, gap: 15 }}
              />
            </View>

            {/* Places List (Horizontal) */}
            <View style={styles.placesContainer}>
              {loading ? (
                 <View style={{height: CARD_HEIGHT, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#FF3D00" />
                    <Text style={{color:'#888', marginTop: 10}}>Loading amazing places...</Text>
                 </View>
              ) : (
                <FlatList
                  horizontal
                  data={places} 
                  renderItem={renderPlaceCard}
                  keyExtractor={(item) => item.id}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20, gap: 20 }}
                  snapToInterval={CARD_WIDTH + 20} 
                  decelerationRate="fast"
                  ListEmptyComponent={
                    <Text style={{textAlign:'center', marginTop: 50, color:'#888', width: width}}>
                      No places found in database.
                    </Text>
                  }
                />
              )}
            </View>
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator<TabParamList>();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, 
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0, 
          shadowOpacity: 0,
          height: Platform.OS === 'ios' ? 90 : 70, 
          paddingTop: 10, 
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
        tabBarActiveTintColor: '#0c0b0bff', 
        tabBarInactiveTintColor: '#B0B0B0', 
      }}
    >
      <Tab.Screen 
        name="HomeScreen" 
        component={HomeContent} 
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
               <Ionicons name={focused? "time" :"time-outline"}size={24} color={color} />
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
              <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    paddingRight:15,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
    fontWeight: '500',
    
  },
  
  
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    height: 50,
    paddingHorizontal: 15,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    height: '100%',
  },
  filterDivider: {
    width: 1,
    height: '60%',
    backgroundColor: '#E0E0E0',
    marginHorizontal: 10,
  },
  filterButton: {
    padding: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    paddingRight:5,
  },
  viewAllText: {
    fontSize: 14,
    color: '#888',

    fontWeight: '500',
  },
  categoriesContainer: {
    marginBottom: 25,
  },
  categoryItem: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
  },
  categoryItemActive: {
    backgroundColor: '#202020',
  },
  categoryText: {
    color: '#888',
    fontWeight: '600',
    fontSize: 15,
  },
  categoryTextActive: {
    color: '#FFF',
  },
  placesContainer: {
    paddingBottom: 20,
  },
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
    //paddingBottom:100,
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
  // Tab Bar Styles
  iconContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 40,
    width: 40,
    marginBottom:30,
    marginTop:5,
  },
  activeDot: { 
    width: 6, 
    height: 6, 
    borderRadius: 3, 
    backgroundColor: '#1b1a19ff', 
    position: 'absolute',
    bottom: -6, 
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  searchResultsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  searchResultIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  searchResultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  searchResultLocation: {
    fontSize: 14,
    color: '#888',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#888',
    fontSize: 16,
  },
});