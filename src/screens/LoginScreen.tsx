// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   StatusBar,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// import { loginUser } from '../services/firebaseAuthServices';

// export default function LoginScreen() {
//   const emailRef = useRef<TextInput>(null);
//   const passwordRef = useRef<TextInput>(null);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const navigation = useNavigation<any>();

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter email and password');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // 🔐 Login
//       await loginUser(email, password);

//       // ✅ MANUAL navigation to Home
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Home' }],
//       });

//     } catch (error: any) {
//       Alert.alert(
//         'Login Failed',
//         error?.message || 'Invalid email or password'
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
//         <StatusBar barStyle="dark-content" />

//         <View style={styles.card}>
//           <Text style={styles.title}>Welcome Back</Text>

//           {/* Email */}
//           <TouchableOpacity
//             style={styles.inputContainer}
//             onPress={() => emailRef.current?.focus()}
//           >
//             <Ionicons name="mail-outline" size={20} color="#888" />
//             <TextInput
//               ref={emailRef}
//               style={styles.input}
//               placeholder="Email"
//               value={email}
//               onChangeText={setEmail}
//               autoCapitalize="none"
//               keyboardType="email-address"
//             />
//           </TouchableOpacity>

//           {/* Password */}
//           <TouchableOpacity
//             style={styles.inputContainer}
//             onPress={() => passwordRef.current?.focus()}
//           >
//             <Ionicons name="lock-closed-outline" size={20} color="#888" />
//             <TextInput
//               ref={passwordRef}
//               style={styles.input}
//               placeholder="Password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry={!showPassword}
//             />
//             <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//               <Ionicons
//                 name={showPassword ? 'eye-outline' : 'eye-off-outline'}
//                 size={20}
//                 color="#888"
//               />
//             </TouchableOpacity>
//           </TouchableOpacity>

//           {/* Login Button */}
//           <TouchableOpacity
//             style={[styles.loginButton, isLoading && { opacity: 0.7 }]}
//             onPress={handleLogin}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.loginButtonText}>Login</Text>
//             )}
//           </TouchableOpacity>

//           {/* Signup */}
//           <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//             <Text style={styles.signupText}>
//               Don’t have an account? Sign up
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#eff4f8ff',
//   },
//   card: {
//     backgroundColor: '#fff',
//     margin: 20,
//     borderRadius: 20,
//     padding: 24,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#060606ff',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     height: 50,
//     marginBottom: 16,
//     borderColor: '#E0E0E0',
//   },
//   input: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 16,
//   },
//   loginButton: {
//     backgroundColor: '#326ca5',
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   signupText: {
//     marginTop: 15,
//     textAlign: 'center',
//     color: '#326ca5',
//     fontSize: 14,
//   },
// });


import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { loginUser } from '../services/firebaseAuthServices';

export default function LoginScreen() {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setIsLoading(true);

    try {
      // 🔐 Firebase login (credentials + UID verified internally)
      await loginUser(email, password);

      // ✅ Manual navigation to Home
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });

    } catch (error: any) {
      Alert.alert(
        'Login Failed',
        error?.message || 'Invalid email or password'
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
        <StatusBar barStyle="dark-content" />

        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>

          {/* Email */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => emailRef.current?.focus()}
            activeOpacity={1}
          >
            <Ionicons name="mail-outline" size={20} color="#888" />
            <TextInput
              ref={emailRef}
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </TouchableOpacity>

          {/* Password */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => passwordRef.current?.focus()}
            activeOpacity={1}
          >
            <Ionicons name="lock-closed-outline" size={20} color="#888" />
            <TextInput
              ref={passwordRef}
              style={styles.input}
              placeholder="Password"
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

          {/* Remember Me */}
          <TouchableOpacity
            style={styles.rememberMeRow}
            onPress={() => setRememberMe(rememberMe)}
            
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Ionicons name="checkmark" size={14} color="#fff" />}
            </View>
            <Text style={styles.rememberMeText}>Remember me</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, isLoading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* Signup */}
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>
              Don’t have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eff4f8ff',
  },
  card: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#060606ff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 16,
    borderColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#326ca5',
    borderColor: '#326ca5',
  },
  rememberMeText: {
    fontSize: 14,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#326ca5',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#326ca5',
    fontSize: 14,
  },
});
