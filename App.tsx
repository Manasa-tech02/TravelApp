// import React, { useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './src/redux/store';
// import AppNavigator from './src/navigation/AppNavigation';


// export default function App() {
//   useEffect(() => {
//     //initAuthListener();
//   }, []);

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <StatusBar style="dark" backgroundColor="#F9F9F9" />
//         <AppNavigator />
//       </PersistGate>
//     </Provider>
//   );
// }
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigation';
import { useAuth } from './src/auth/useAuth';

export default function App() {
  const { loading } = useAuth();

  if (loading) return null; // splash later

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar style="dark" backgroundColor="#F9F9F9" />
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}
