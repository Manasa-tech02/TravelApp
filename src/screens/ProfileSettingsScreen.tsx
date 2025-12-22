// import React, { useState } from 'react';
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const ProfileSettingsScreen = () => {
//   const navigation = useNavigation();
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('john.doe@example.com');
//   const [phone, setPhone] = useState('+1 (555) 123-4567');
//   const [location, setLocation] = useState('San Francisco, CA');
//   const [username, setUsername] = useState('johndoe');

//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={28} color="#222" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Profile Settings</Text>
//       </View>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
        
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Personal Information</Text>
//           <Text style={styles.sectionSubtitle}>Update your personal details and contact information</Text>
//           <View style={styles.row}>
//             <View style={styles.inputContainerHalf}>
//               <Ionicons name="person-outline" size={18} color="#888" style={styles.inputIcon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="First Name"
//                 value={firstName}
//                 onChangeText={setFirstName}
//               />
//             </View>
//             <View style={styles.inputContainerHalf}>
//               <Ionicons name="person-outline" size={18} color="#888" style={styles.inputIcon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChangeText={setLastName}
//               />
//             </View>
//           </View>
//           <View style={styles.divider} />
//           <Text style={styles.sectionLabel}>Contact Details</Text>
//           <View style={styles.inputContainer}>
//             <Ionicons name="mail-outline" size={18} color="#888" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Email Address"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           </View>
//           <View style={styles.inputContainer}>
//             <Ionicons name="call-outline" size={18} color="#888" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Phone Number"
//               value={phone}
//               onChangeText={setPhone}
//               keyboardType="phone-pad"
//             />
//           </View>
//           <View style={styles.divider} />
//           <Text style={styles.sectionLabel}>Location</Text>
//           <View style={styles.inputContainer}>
//             <Ionicons name="location-outline" size={18} color="#888" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Location"
//               value={location}
//               onChangeText={setLocation}
//             />
//           </View>
//         </View>
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Account Settings</Text>
//           <Text style={styles.sectionSubtitle}>Manage your account security and preferences</Text>
//           <Text style={styles.sectionLabel}>Username</Text>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Username"
//               value={username}
//               onChangeText={setUsername}
//               autoCapitalize="none"
//             />
//           </View>
//           <Text style={styles.inputHint}>Your unique identifier across the platform</Text>
//           <Text style={styles.sectionLabel}>Current Password</Text>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter current password"
//               value={currentPassword}
//               onChangeText={setCurrentPassword}
//               secureTextEntry
//             />
//           </View>
//           <View style={styles.row}>
//             <View style={styles.inputContainerHalf}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter new password"
//                 value={newPassword}
//                 onChangeText={setNewPassword}
//                 secureTextEntry
//               />
//             </View>
//             <View style={styles.inputContainerHalf}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Confirm new password"
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 secureTextEntry
//               />
//             </View>
//           </View>
//         </View>
//         <View style={styles.buttonRow}>
//           <TouchableOpacity style={styles.cancelButton}>
//             <Text style={styles.cancelButtonText}>Cancel</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.saveButton}>
            
//             <Text style={styles.saveButtonText}>Save Changes</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: Platform.OS === 'ios' ? 50 : 24,
//     paddingBottom: 16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
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
//   scrollContent: {
//     padding: 18,
//     paddingBottom: 40,
//   },
//   pageTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#222',
//     marginBottom: 4,
//   },
//   pageSubtitle: {
//     fontSize: 16,
//     color: '#888',
//     marginBottom: 18,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     marginBottom: 24,
//     padding: 18,
//     // iOS shadow
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.04,
//     shadowRadius: 8,
//     // Android shadow
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#222',
//     marginBottom: 2,
//   },
//   sectionSubtitle: {
//     fontSize: 14,
//     color: '#888',
//     marginBottom: 12,
//   },
//   sectionLabel: {
//     fontSize: 13,
//     fontWeight: 'bold',
//     color: '#888',
//     marginTop: 12,
//     marginBottom: 6,
//     letterSpacing: 1,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 12,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f7f7f7',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     marginBottom: 12,
//     height: 44,
//   },
//   inputContainerHalf: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f7f7f7',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     marginBottom: 12,
//     height: 44,
//   },
//   inputIcon: {
//     marginRight: 8,
//   },
//   input: {
//     flex: 1,
//     fontSize: 15,
//     color: '#222',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#ececec',
//     marginVertical: 12,
//   },
//   inputHint: {
//     fontSize: 12,
//     color: '#aaa',
//     marginBottom: 10,
//     marginLeft: 2,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 8,
//     gap: 12,
//   },
//   cancelButton: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     marginRight: 8,
//   },
//   cancelButtonText: {
//     color: '#222',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   saveButton: {
    
//     alignItems: 'center',
//     backgroundColor: '#43679aff',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default ProfileSettingsScreen;



import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import { useAuth } from '../auth/useAuth';
import {
  getUserProfile,
  updateUserProfile,
} from '../services/firebaseUserServices';

const ProfileSettingsScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [onFocusedField, setOnFocusedField] = useState<string | null>(null);

  // 🔥 Load profile from Firestore
  useEffect(() => {
    if (!user?.uid) return;

    (async () => {
      const profile = await getUserProfile(user.uid);
      if (!profile) return;

      const parts = profile.fullName?.split(' ') || [];
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
      setEmail(profile.email || '');
      setPhone(profile.phone || '');
      setLocation(profile.location || '');
      setAddress(profile.address || '');
      setPincode(profile.pincode || '');
    })();
  }, [user?.uid]);

  // 🔥 Save changes
  const handleSaveChanges = async () => {
    if (!user?.uid) return;

    if (!firstName.trim()) {
      Alert.alert('Validation', 'First name is required');
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    try {
      await updateUserProfile(user.uid, {
        fullName,
        phone,
        location,
        address,
        pincode,
      });

      if (email !== user.email) {
        await auth().currentUser?.updateEmail(email);
      }

      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Personal Info */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.row}>
            <View style={styles.inputContainerHalf}>
              <Ionicons name="person-outline" size={18} color="#888" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, onFocusedField === 'firstName' && styles.inputFocused]}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                onFocus={() => setOnFocusedField('firstName')}
                onBlur={() => setOnFocusedField(null)}
              />
            </View>

            <View style={styles.inputContainerHalf}>
              <Ionicons name="person-outline" size={18} color="#888" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, onFocusedField === 'lastName' && styles.inputFocused]}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                onFocus={() => setOnFocusedField('lastName')}
                onBlur={() => setOnFocusedField(null)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={18} color="#888" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, onFocusedField === 'email' && styles.inputFocused]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setOnFocusedField('email')}
              onBlur={() => setOnFocusedField(null)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={18} color="#888" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, onFocusedField === 'phone' && styles.inputFocused]}
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              onFocus={() => setOnFocusedField('phone')}
              onBlur={() => setOnFocusedField(null)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={18} color="#888" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, onFocusedField === 'location' && styles.inputFocused]}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
              onFocus={() => setOnFocusedField('location')}
              onBlur={() => setOnFocusedField(null)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="home-outline" size={18} color="#888" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, onFocusedField === 'address' && styles.inputFocused]}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              onFocus={() => setOnFocusedField('address')}
              onBlur={() => setOnFocusedField(null)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-open-outline" size={18} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Pincode"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="number-pad"
              maxLength={6}
              onFocus={() => setOnFocusedField('fieldName')}
              onBlur={() => setOnFocusedField(null)}
            />
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 24,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 18,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 44,
  },
  inputContainerHalf: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 44,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  inputFocused: {
  borderWidth: 1.5,
  borderColor: '#43679a',
  backgroundColor: '#eef4fb',
},
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cancelButtonText: {
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#43679a',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileSettingsScreen;
