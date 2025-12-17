// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// import { useAppSelector, useAppDispatch } from '../redux/hooks';
// import { logoutUser } from '../services/firebaseAuthServices';
// import { RootStackParamList } from '../navigation/types';


// const ProfileScreen = () => {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const dispatch = useAppDispatch();
//   const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  
//   const handleFooterPress = () => {
//     if (isAuthenticated) {
//       dispatch(logoutUser());
//     } else {
//       navigation.navigate('ProfileScreen2');
//     }
//   };
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//       {/* Header with Back Arrow and Title */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={28} color="#222" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Settings & Activity</Text>
//       </View>
//       <ScrollView style={styles.container}>
//         {/* Account Section */}
//         <Text style={styles.sectionLabel}>ACCOUNT</Text>
//         <View style={styles.card}>
//           <TouchableOpacity style={styles.cardItem} onPress={() => navigation.navigate('ProfileSettingsScreen')}>
//             <View style={styles.cardIconCircle}>
//               <Ionicons name="person-circle-outline" size={28} color="#222" />
//             </View>
//             <View>
//               <Text style={styles.cardTitle}>Profile Settings</Text>
//               <Text style={styles.cardSubtitle}>Edit your personal information</Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* Preferences Section */}
//         <Text style={styles.sectionLabel}>PREFERENCES</Text>
//         <View style={styles.card}>
//           <TouchableOpacity style={styles.cardItem}>
//             <View style={styles.cardIconCircle}>
//               <Ionicons name="moon-outline" size={24} color="#222" />
//             </View>
//             <View>
//               <Text style={styles.cardTitle}>Themes</Text>
//               <Text style={styles.cardSubtitle}>Light, dark, or system</Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.cardItem}>
//             <View style={styles.cardIconCircle}>
//               <Ionicons name="notifications-outline" size={24} color="#222" />
//             </View>
//             <View>
//               <Text style={styles.cardTitle}>Notifications</Text>
//               <Text style={styles.cardSubtitle}>Push, email, and in-app alerts</Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.cardItem}>
//             <View style={styles.cardIconCircle}>
//               <Ionicons name="language-outline" size={24} color="#222" />
//             </View>
//             <View>
//               <Text style={styles.cardTitle}>Languages & Translations</Text>
//               <Text style={styles.cardSubtitle}>English (US)</Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* Support & Legal Section */}
//         <Text style={styles.sectionLabel}>SUPPORT & LEGAL</Text>
//         <View style={styles.card}>
//           <TouchableOpacity style={styles.cardItem}>
//             <View style={styles.cardIconCircle}>
//               <Ionicons name="help-circle-outline" size={24} color="#222" />
//             </View>
//             <View>
//               <Text style={styles.cardTitle}>Help & Support</Text>
//               <Text style={styles.cardSubtitle}>FAQs and contact us</Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.cardItem}>
//             <View style={styles.cardIconCircle}>
//               <Ionicons name="document-text-outline" size={24} color="#222" />
//             </View>
//             <View>
//               <Text style={styles.cardTitle}>Terms & Conditions</Text>
//               <Text style={styles.cardSubtitle}>Privacy policy and terms</Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* Footer Button: Sign In or Log Out */}
//         <TouchableOpacity style={styles.logoutButton} onPress={handleFooterPress}>
//           <Text style={styles.logoutText}>{isAuthenticated ? 'Log Out' : 'Sign In'}</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 0,
//     paddingTop: 0,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: Platform.OS === 'ios' ? 50 : 24,
//     paddingBottom: 16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#f0f0f0',
//     elevation: 2,
//   },
//   backButton: {
//     marginRight: 12,
//     padding: 4,
//     borderRadius: 20,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#222',
//     letterSpacing: 0.5,
//   },
//   sectionLabel: {
//     fontSize: 13,
//     fontWeight: 'bold',
//     color: '#535151ff',
//     marginTop: 24,
//     marginBottom: 8,
//     marginLeft: 18,
//     letterSpacing: 1,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     marginHorizontal: 12,
//     marginBottom: 16,
//     paddingVertical: 0,
//     // iOS shadow
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.04,
//     shadowRadius: 8,
//     // Android shadow
//     elevation: 2,
//   },
//   cardItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 18,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f3f3f3',
//   },
//   cardItemLast: {
//     borderBottomWidth: 0,
//   },
//   cardIconCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#f5f5f5',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 16,
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#222',
//   },
//   cardSubtitle: {
//     fontSize: 13,
//     color: '#888',
//     marginTop: 2,
//   },
//   logoutButton: {
//     marginTop: 16,
//     marginBottom: 32,
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ff3d3d',
//     borderRadius: 12,
//     paddingVertical: 18,
//     alignItems: 'center',
//     marginHorizontal: 16,
//   },
//   logoutText: {
//     color: '#ff3d3d',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },

// });

// export default ProfileScreen;




// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import auth from '@react-native-firebase/auth';
// import { RootStackParamList } from '../navigation/types';

// const ProfileScreen = () => {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const [user, setUser] = useState(auth().currentUser);

//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged(setUser);
//     return unsubscribe;
//   }, []);

//   const isAuthenticated = !!user;

//   const handleFooterPress = () => {
//     if (!isAuthenticated) {
//       navigation.navigate('SignUp');
//       return;
//     }

//     Alert.alert(
//       'Log out',
//       'Are you sure you want to log out?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Log out', style: 'destructive', onPress: () => auth().signOut() },
//       ]
//     );
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={28} color="#222" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Settings & Activity</Text>
//       </View>

//       <ScrollView style={styles.container}>
//         <Text style={styles.sectionLabel}>ACCOUNT</Text>

//         <View style={styles.card}>
//           <TouchableOpacity
//             style={styles.cardItem}
//             onPress={() => {
//               if (!isAuthenticated) {
//                 navigation.navigate('SignUp');
//                 return;
//               }
//               navigation.navigate('ProfileSettings');
//             }}
//           >
//             <View style={styles.cardIconCircle}>
//               <Ionicons name="person-circle-outline" size={28} color="#222" />
//             </View>
//             <View>
//               <Text style={styles.cardTitle}>Profile Settings</Text>
//               <Text style={styles.cardSubtitle}>Edit your personal information</Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.logoutButton} onPress={handleFooterPress}>
//           <Text style={styles.logoutText}>
//             {isAuthenticated ? 'Log Out' : 'Sign Up'}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 0,
//     paddingTop: 0,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: Platform.OS === 'ios' ? 50 : 24,
//     paddingBottom: 16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#f0f0f0',
//     elevation: 2,
//   },
//   backButton: {
//     marginRight: 12,
//     padding: 4,
//     borderRadius: 20,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#222',
//     letterSpacing: 0.5,
//   },
//   sectionLabel: {
//     fontSize: 13,
//     fontWeight: 'bold',
//     color: '#535151ff',
//     marginTop: 24,
//     marginBottom: 8,
//     marginLeft: 18,
//     letterSpacing: 1,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     marginHorizontal: 12,
//     marginBottom: 16,
//     paddingVertical: 0,
//     // iOS shadow
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.04,
//     shadowRadius: 8,
//     // Android shadow
//     elevation: 2,
//   },
//   cardItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 18,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f3f3f3',
//   },
//   cardItemLast: {
//     borderBottomWidth: 0,
//   },
//   cardIconCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#f5f5f5',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 16,
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#222',
//   },
//   cardSubtitle: {
//     fontSize: 13,
//     color: '#888',
//     marginTop: 2,
//   },
//   logoutButton: {
//     marginTop: 16,
//     marginBottom: 32,
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ff3d3d',
//     borderRadius: 12,
//     paddingVertical: 18,
//     alignItems: 'center',
//     marginHorizontal: 16,
//   },
//   logoutText: {
//     color: '#ff3d3d',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },

// });


// export default ProfileScreen;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../auth/useAuth';

const ProfileScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // ✅ Single source of truth for auth
  const { user } = useAuth();
  const isAuthenticated = !!user;

  const handleFooterPress = () => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
      return;
    }

    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log out',
          style: 'destructive',
          onPress: async () => {
            await auth().signOut();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings & Activity</Text>
      </View>

      <ScrollView style={styles.container}>
        <Text style={styles.sectionLabel}>ACCOUNT</Text>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardItem}
            onPress={() => {
              if (!isAuthenticated) {
                navigation.navigate('SignUp');
                return;
              }
              navigation.navigate('ProfileSettings');
            }}
          >
            <View style={styles.cardIconCircle}>
              <Ionicons
                name="person-circle-outline"
                size={28}
                color="#222"
              />
            </View>
            <View>
              <Text style={styles.cardTitle}>Profile Settings</Text>
              <Text style={styles.cardSubtitle}>
                Edit your personal information
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleFooterPress}
        >
          <Text style={styles.logoutText}>
            {isAuthenticated ? 'Log Out' : 'Log in'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 24,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
    elevation: 2,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 0.5,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#535151ff',
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 18,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 12,
    marginBottom: 16,
    elevation: 2,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
  },
  cardIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  logoutButton: {
    marginTop: 16,
    marginBottom: 32,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff3d3d',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  logoutText: {
    color: '#ff3d3d',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;




