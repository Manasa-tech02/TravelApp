import * as SecureStore from 'expo-secure-store';

const secureStorage = {
  setItem: (key: string, value: string) => {
    return SecureStore.setItemAsync(key, value);
  },
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  removeItem: (key: string) => {
    return SecureStore.deleteItemAsync(key);
  },
};

export default secureStorage;
