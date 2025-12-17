// //   // ...existing code...
// // import React, { useState, useRef, useCallback } from 'react';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { 
// //   View, 
// //   Text, 
// //   StyleSheet, 
// //   TextInput, 
// //   TouchableOpacity, 
// //   StatusBar,
// //   KeyboardAvoidingView,
// //   Platform,
// //   ScrollView,
// //   Alert,
// //   ActivityIndicator
// // } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';
// // import { useNavigation, useFocusEffect } from '@react-navigation/native';
// // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../navigation/types';
// // import { useAppDispatch } from '../redux/hooks';
// // import { login, registerUser } from '../redux/slices/authSlice';
// import auth from '@react-native-firebase/auth';
// import { createUserProfile } from '../services/firebaseUserService';



// // export default function SignUpScreen() {
// //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// //   const dispatch = useAppDispatch();
// //   const fullNameRef = useRef<TextInput>(null);
// //   const emailRef = useRef<TextInput>(null);
// //   const passwordRef = useRef<TextInput>(null);
// //   const confirmPasswordRef = useRef<TextInput>(null);
// //   const [fullName, setFullName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [agreeTerms, setAgreeTerms] = useState(false);
// //   const [isLoading,setIsLoading] = useState(false)

// //   // Clear form when screen comes into focus
// //   useFocusEffect(
// //     useCallback(() => {
// //       return () => {
// //         setFullName('');
// //         setEmail('');
// //         setPassword('');
// //         setConfirmPassword('');
// //         setAgreeTerms(false);
// //       };
// //     }, [])
// //   );

// //   // Sign up handler (add your logic here)
// //   const handleSignUp = async () => {
// //     if (!fullName || !email || !password || !confirmPassword) {
// //       Alert.alert('Error', 'Please fill all fields');
// //       return;
// //     }
// //     if (password !== confirmPassword) {
// //       Alert.alert('Error', 'Passwords do not match');
// //       return;
// //     }
// //     if (!agreeTerms) {
// //       Alert.alert('Error', 'You must agree to the terms');
// //       return;
// //     }
// //     setIsLoading(true);
// //     try {
// //       const resultAction = await dispatch(registerUser({ name: fullName, email, password }));
// //       if (registerUser.fulfilled.match(resultAction)) {
// //         dispatch(login(resultAction.payload));
// //         navigation.navigate('HomeScreen', { screen: 'HomeScreen' });
// //       } else {
// //         Alert.alert('Sign Up Failed', resultAction.payload as string || 'Unknown error');
// //       }
// //     } catch (error: any) {
// //       Alert.alert('Sign Up Failed', error.message);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={{ flex: 1 }}>
// //       <KeyboardAvoidingView
// //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //         style={styles.container}
// //       >
// //         <StatusBar barStyle="dark-content" backgroundColor="#eef3f8ff" />
// //         {/* Header */}
// //         <View style={styles.header}>
// //           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
// //             <Ionicons name="arrow-back" size={24} color="#fff" />
// //           </TouchableOpacity>
// //           <Text style={styles.headerTitle}>Create Account</Text>
// //         </View>
// //         <ScrollView contentContainerStyle={styles.content}>
// //           <View style={styles.card}>
// //             {/* Full Name Input */}
// //             <Text style={styles.label}>Full Name</Text>
// //             <TouchableOpacity
// //               activeOpacity={1}
// //               style={styles.inputContainer}
// //               onPress={() => fullNameRef.current?.focus()}
// //             >
// //               <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
// //               <TextInput
// //                 ref={fullNameRef}
// //                 style={styles.input}
// //                 placeholder="Enter your full name"
// //                 value={fullName}
// //                 onChangeText={setFullName}
// //               />
// //             </TouchableOpacity>
// //             {/* Email Input */}
// //             <Text style={styles.label}>Email</Text>
// //             <TouchableOpacity
// //               activeOpacity={1}
// //               style={styles.inputContainer}
// //               onPress={() => emailRef.current?.focus()}
// //             >
// //               <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
// //               <TextInput
// //                 ref={emailRef}
// //                 style={styles.input}
// //                 placeholder="your@email.com"
// //                 value={email}
// //                 onChangeText={setEmail}
// //                 keyboardType="email-address"
// //                 autoCapitalize="none"
// //               />
// //             </TouchableOpacity>
// //             {/* Password Input */}
// //             <Text style={styles.label}>Password</Text>
// //             <TouchableOpacity
// //               activeOpacity={1}
// //               style={styles.inputContainer}
// //               onPress={() => passwordRef.current?.focus()}
// //             >
// //               <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
// //               <TextInput
// //                 ref={passwordRef}
// //                 style={styles.input}
// //                 placeholder="Enter your password"
// //                 value={password}
// //                 onChangeText={setPassword}
// //                 secureTextEntry={!showPassword}
// //               />
// //               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
// //                 <Ionicons name={!showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#888" />
// //               </TouchableOpacity>
// //             </TouchableOpacity>
// //             {/* Confirm Password Input */}
// //             <Text style={styles.label}>Confirm Password</Text>
// //             <TouchableOpacity
// //               activeOpacity={1}
// //               style={styles.inputContainer}
// //               onPress={() => confirmPasswordRef.current?.focus()}
// //             >
// //               <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
// //               <TextInput
// //                 ref={confirmPasswordRef}
// //                 style={styles.input}
// //                 placeholder="Confirm your password"
// //                 value={confirmPassword}
// //                 onChangeText={setConfirmPassword}
// //                 secureTextEntry={!showConfirmPassword}
// //               />
// //               <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
// //                 <Ionicons name={!showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#888" />
// //               </TouchableOpacity>
// //             </TouchableOpacity>
// //             {/* Terms Checkbox */}
// //             <TouchableOpacity
// //               style={styles.checkboxContainer}
// //               onPress={() => setAgreeTerms(!agreeTerms)}
// //             >
// //               <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
// //                 {agreeTerms && <Ionicons name="checkmark" size={14} color="#fff" />}
// //               </View>
// //               <Text style={styles.checkboxLabel}>
// //                 I agree to the <Text style={styles.linkText}>Terms & Conditions</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
// //               </Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //               style={[styles.signUpButton, isLoading && { opacity: 0.7 }]}
// //               onPress={handleSignUp}
// //               disabled={isLoading}
// //             >
// //               {isLoading ? (
// //                 <ActivityIndicator size="small" color="#fff" />
// //               ) : (
// //                 <Text style={styles.signUpButtonText}>Create Account</Text>
// //               )}
// //             </TouchableOpacity>
// //             {/* Divider */}
// //             <View style={styles.dividerContainer}>
// //               <View style={styles.dividerLine} />
// //               <Text style={styles.dividerText}>or</Text>
// //               <View style={styles.dividerLine} />
// //             </View>
// //             {/* Footer */}
// //             <View style={styles.footer}>
// //               <Text style={styles.footerText}>Already have an account? </Text>
// //               <TouchableOpacity onPress={() => navigation.navigate('HomeScreen', { screen: 'Profile' })}>
// //                 <Text style={styles.footerLink}>Sign in</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </ScrollView>
// //       </KeyboardAvoidingView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#326ca5ff',
// //     paddingTop: 30,
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingHorizontal: 20,
// //     paddingTop: Platform.OS === 'ios' ? 50 : 20,
// //     paddingBottom: 20,
// //   },
// //   backButton: {
// //     marginRight: 15,
// //   },
// //   headerTitle: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: '#fff',
// //   },
// //   content: {
// //     flexGrow: 1,
// //     backgroundColor: '#fff',
// //     borderTopLeftRadius: 30,
// //     borderTopRightRadius: 30,
// //     borderBottomLeftRadius: 30,
// //     borderBottomRightRadius: 30,
// //     paddingHorizontal: 20,
// //     paddingTop: 20,
// //     paddingBottom: 20,
// //     marginBottom:100,
// //   },
// //   card: {
// //     width: '100%',
// //   },
// //   subtitle: {
// //     fontSize: 16,
// //     color: '#666',
// //     textAlign: 'center',
// //     marginBottom: 30,
// //   },
// //   label: {
// //     fontSize: 14,
// //     fontWeight: '600',
// //     color: '#333',
// //     marginBottom: 8,
// //   },
// //   inputContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     borderWidth: 1,
// //     borderColor: '#E0E0E0',
// //     borderRadius: 12,
// //     paddingHorizontal: 15,
// //     height: 50,
// //     marginBottom: 20,
// //     backgroundColor: '#fff',
// //   },
// //   inputIcon: {
// //     marginRight: 10,
// //   },
// //   input: {
// //     flex: 1,
// //     fontSize: 16,
// //     color: '#333',
// //     paddingVertical: 10,
// //   },
// //   checkboxContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 20,
// //   },
// //   checkbox: {
// //     width: 20,
// //     height: 20,
// //     borderWidth: 1,
// //     borderColor: '#888',
// //     borderRadius: 4,
// //     marginRight: 8,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   checkboxChecked: {
// //     backgroundColor: '#0066CC',
// //     borderColor: '#0066CC',
// //   },
// //   checkboxLabel: {
// //     color: '#666',
// //     fontSize: 14,
// //     flex: 1,
// //     flexWrap: 'wrap',
// //   },
// //   linkText: {
// //     color: '#0066CC',
// //     fontWeight: 'bold',
// //   },
// //   signUpButton: {
// //     backgroundColor: '#326ca5ff',
// //     height: 50,
// //     borderRadius: 25,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginBottom: 25,
// //     shadowColor: '#0066CC',
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 8,
// //     elevation: 5,
// //   },
// //   signUpButtonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   dividerContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 25,
// //   },
// //   dividerLine: {
// //     flex: 1,
// //     height: 1,
// //     backgroundColor: '#E0E0E0',
// //   },
// //   dividerText: {
// //     marginHorizontal: 10,
// //     color: '#888',
// //   },
// //   footer: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     paddingTop: -10,
// //   },
// //   footerText: {
// //     color: '#666',
// //     fontSize: 14,
// //   },
// //   footerLink: {
// //     color: '#0066CC',
// //     fontWeight: 'bold',
// //     fontSize: 14,
// //   },
// // });



// import React, { useState, useRef, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   StatusBar,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { useFocusEffect } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';
// import { signupUser } from '../services/firebaseAuthServices';

// export default function SignUpScreen() {
//   const fullNameRef = useRef<TextInput>(null);
//   const emailRef = useRef<TextInput>(null);
//   const passwordRef = useRef<TextInput>(null);
//   const confirmPasswordRef = useRef<TextInput>(null);

//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigation = useNavigation();

//   // Clear form when screen is focused
//   useFocusEffect(
//     useCallback(() => {
//       return () => {
//         setFullName('');
//         setEmail('');
//         setPassword('');
//         setConfirmPassword('');
//         setAgreeTerms(false);
//       };
//     }, [])
//   );

//   const handleSignUp = async () => {
//     if (!fullName || !email || !password || !confirmPassword) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     if (!agreeTerms) {
//       Alert.alert('Error', 'You must agree to the terms');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // 🔐 Firebase signup (auto-login happens here)
//       await signupUser(email, password);

//       // ❌ DO NOT navigate
//       // Firebase auth listener will move user to Home automatically

//     } catch (error: any) {
//       Alert.alert(
//         'Sign Up Failed',
//         error?.message || 'Something went wrong'
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.container}
//       >
//         <StatusBar barStyle="dark-content" backgroundColor="#326ca5" />

//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Ionicons name="arrow-back" size={28} color="#222" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Create Account</Text>
//         </View>

//         <ScrollView contentContainerStyle={styles.content}>
//           <View style={styles.card}>

//             {/* Full Name */}
//             <Text style={styles.label}>Full Name</Text>
//             <TouchableOpacity
//               activeOpacity={1}
//               style={styles.inputContainer}
//               onPress={() => fullNameRef.current?.focus()}
//             >
//               <Ionicons name="person-outline" size={20} color="#888" />
//               <TextInput
//                 ref={fullNameRef}
//                 style={styles.input}
//                 placeholder="Enter your full name"
//                 value={fullName}
//                 onChangeText={setFullName}
//               />
//             </TouchableOpacity>

//             {/* Email */}
//             <Text style={styles.label}>Email</Text>
//             <TouchableOpacity
//               activeOpacity={1}
//               style={styles.inputContainer}
//               onPress={() => emailRef.current?.focus()}
//             >
//               <Ionicons name="mail-outline" size={20} color="#888" />
//               <TextInput
//                 ref={emailRef}
//                 style={styles.input}
//                 placeholder="your@email.com"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//             </TouchableOpacity>

//             {/* Password */}
//             <Text style={styles.label}>Password</Text>
//             <TouchableOpacity
//               activeOpacity={1}
//               style={styles.inputContainer}
//               onPress={() => passwordRef.current?.focus()}
//             >
//               <Ionicons name="lock-closed-outline" size={20} color="#888" />
//               <TextInput
//                 ref={passwordRef}
//                 style={styles.input}
//                 placeholder="Enter password"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Ionicons
//                   name={showPassword ? 'eye-outline' : 'eye-off-outline'}
//                   size={20}
//                   color="#888"
//                 />
//               </TouchableOpacity>
//             </TouchableOpacity>

//             {/* Confirm Password */}
//             <Text style={styles.label}>Confirm Password</Text>
//             <TouchableOpacity
//               activeOpacity={1}
//               style={styles.inputContainer}
//               onPress={() => confirmPasswordRef.current?.focus()}
//             >
//               <Ionicons name="lock-closed-outline" size={20} color="#888" />
//               <TextInput
//                 ref={confirmPasswordRef}
//                 style={styles.input}
//                 placeholder="Confirm password"
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 secureTextEntry={!showConfirmPassword}
//               />
//               <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
//                 <Ionicons
//                   name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
//                   size={20}
//                   color="#888"
//                 />
//               </TouchableOpacity>
//             </TouchableOpacity>

//             {/* Terms */}
//             <TouchableOpacity
//               style={styles.checkboxContainer}
//               onPress={() => setAgreeTerms(!agreeTerms)}
//             >
//               <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
//                 {agreeTerms && <Ionicons name="checkmark" size={14} color="#fff" />}
//               </View>
//               <Text style={styles.checkboxLabel}>
//                 I agree to the Terms & Privacy Policy
//               </Text>
//             </TouchableOpacity>

//             {/* Button */}
//             <TouchableOpacity
//               style={[styles.signUpButton, isLoading && { opacity: 0.7 }]}
//               onPress={handleSignUp}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.signUpButtonText}>Create Account</Text>
//               )}
//             </TouchableOpacity>

//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#eff4f8ff' },
//   header: { padding: 30,flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: Platform.OS === 'ios' ? 50 : 24,
//     paddingBottom: 16, },
//   headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#060606ff' },
//   content: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,

//     padding: 20,
//   },
//   card: { width: '100%' },
//   label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     height: 50,
//     marginBottom: 20,
//     borderColor: '#E0E0E0',
//   },
//   backButton: {
//     marginRight: 12,
//     padding: 4,
//     borderRadius: 20,
//   },
//   input: { flex: 1, fontSize: 16, marginLeft: 10 },
//   checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderRadius: 4,
//     marginRight: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkboxChecked: { backgroundColor: '#326ca5', borderColor: '#326ca5' },
//   checkboxLabel: { fontSize: 14 },
//   signUpButton: {
//     backgroundColor: '#326ca5',
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   signUpButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// });


import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function SignUpScreen() {
  const fullNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<any>();

  // Clear form when screen is focused
  useFocusEffect(
    useCallback(() => {
      return () => {
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setAgreeTerms(false);
      };
    }, [])
  );

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      Alert.alert('Error', 'You must agree to the terms');
      return;
    }

    setIsLoading(true);

    try {
      // 🔐 1. Create Firebase Auth user
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      const uid = result.user.uid;

      // 🧾 2. Store user profile in Firestore
      await firestore()
        .collection('users')
        .doc(uid)
        .set({
          fullName,
          email,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert('Success', 'Account created successfully');

      // 👉 3. Navigate to Login screen
      navigation.navigate('Login');

    } catch (error: any) {
      Alert.alert(
        'Sign Up Failed',
        error?.message || 'Something went wrong'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#326ca5" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={28} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.card}>

            {/* Full Name */}
            <Text style={styles.label}>Full Name</Text>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.inputContainer}
              onPress={() => fullNameRef.current?.focus()}
            >
              <Ionicons name="person-outline" size={20} color="#888" />
              <TextInput
                ref={fullNameRef}
                style={styles.input}
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
              />
            </TouchableOpacity>

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.inputContainer}
              onPress={() => emailRef.current?.focus()}
            >
              <Ionicons name="mail-outline" size={20} color="#888" />
              <TextInput
                ref={emailRef}
                style={styles.input}
                placeholder="your@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </TouchableOpacity>

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.inputContainer}
              onPress={() => passwordRef.current?.focus()}
            >
              <Ionicons name="lock-closed-outline" size={20} color="#888" />
              <TextInput
                ref={passwordRef}
                style={styles.input}
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Confirm Password */}
            <Text style={styles.label}>Confirm Password</Text>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.inputContainer}
              onPress={() => confirmPasswordRef.current?.focus()}
            >
              <Ionicons name="lock-closed-outline" size={20} color="#888" />
              <TextInput
                ref={confirmPasswordRef}
                style={styles.input}
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Terms */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAgreeTerms(!agreeTerms)}
            >
              <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
                {agreeTerms && <Ionicons name="checkmark" size={14} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>
                I agree to the Terms & Privacy Policy
              </Text>
            </TouchableOpacity>

            {/* Button */}
            <TouchableOpacity
              style={[styles.signUpButton, isLoading && { opacity: 0.7 }]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.signUpButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eff4f8ff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 24,
    paddingBottom: 16,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#060606ff' },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  card: { width: '100%' },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
    borderColor: '#E0E0E0',
  },
  backButton: { marginRight: 12, padding: 4 },
  input: { flex: 1, fontSize: 16, marginLeft: 10 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: { backgroundColor: '#326ca5', borderColor: '#326ca5' },
  checkboxLabel: { fontSize: 14 },
  signUpButton: {
    backgroundColor: '#326ca5',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

