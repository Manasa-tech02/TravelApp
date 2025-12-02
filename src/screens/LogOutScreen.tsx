import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabParamList } from '../navigation/types';

const LogOutScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<TabParamList>>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        <View style={styles.card}>
            <View style={styles.userInfoContainer}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </Text>
                </View>
                <Text style={styles.userName}>
                    {user?.name || 'User'}
                </Text>
                <Text style={styles.userEmail}>
                    {user?.email || 'email@example.com'}
                </Text>
            </View>

            <View style={styles.divider} />

            <TouchableOpacity 
                onPress={handleLogout}
                style={styles.logoutButton}
                activeOpacity={0.8}
            >
                <Text style={styles.logoutButtonText}>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 32,
    borderRadius: 24,
    width: '85%',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 10,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  avatarContainer: {
    height: 96,
    width: 96,
    backgroundColor: '#F97316', // orange-500
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937', // gray-800
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6B7280', // gray-500
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB', // gray-200
    marginVertical: 16,
  },
  logoutButton: {
    backgroundColor: '#EF4444', // red-500
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LogOutScreen;
