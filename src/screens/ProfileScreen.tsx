import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';
import { RootStackParamList } from '../navigation/types';


const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  
  const handleFooterPress = () => {
    if (isAuthenticated) {
      dispatch(logout());
    } else {
      navigation.navigate('ProfileScreen2');
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <ScrollView style={styles.container}>
        {/* Account Section */}
        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="person-circle-outline" size={32} color="#222" style={styles.icon} />
          <View>
            <Text style={styles.itemTitle}>Profile Settings</Text>
            <Text style={styles.itemSubtitle}>Edit your personal information</Text>
          </View>
        </TouchableOpacity>

        {/* Preferences Section */}
        <Text style={styles.sectionTitle}>PREFERENCES</Text>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="moon-outline" size={28} color="#222" style={styles.icon} />
          <View>
            <Text style={styles.itemTitle}>Themes</Text>
            <Text style={styles.itemSubtitle}>Light, dark, or system</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="notifications-outline" size={28} color="#222" style={styles.icon} />
          <View>
            <Text style={styles.itemTitle}>Notifications</Text>
            <Text style={styles.itemSubtitle}>Push, email, and in-app alerts</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="language-outline" size={28} color="#222" style={styles.icon} />
          <View>
            <Text style={styles.itemTitle}>Languages & Translations</Text>
            <Text style={styles.itemSubtitle}>English (US)</Text>
          </View>
        </TouchableOpacity>

        {/* Support & Legal Section */}
        <Text style={styles.sectionTitle}>SUPPORT & LEGAL</Text>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="help-circle-outline" size={28} color="#222" style={styles.icon} />
          <View>
            <Text style={styles.itemTitle}>Help & Support</Text>
            <Text style={styles.itemSubtitle}>FAQs and contact us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="document-text-outline" size={28} color="#222" style={styles.icon} />
          <View>
            <Text style={styles.itemTitle}>Terms & Conditions</Text>
            <Text style={styles.itemSubtitle}>Privacy policy and terms</Text>
          </View>
        </TouchableOpacity>

        {/* Footer Button: Sign In or Log Out */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleFooterPress}>
          <Text style={styles.logoutText}>{isAuthenticated ? 'Log Out' : 'Sign In'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: '#326ca5ff',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f9f5f5ff',
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 8,
    letterSpacing: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 2,
    elevation: 1,
  },
  icon: {
    marginRight: 18,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  logoutButton: {
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff3d3d',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal:2,
    
    
  },
  logoutText: {
    color: '#ff3d3d',
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: -5,
  },

});

export default ProfileScreen;
