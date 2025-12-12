import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookNowScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Now</Text>
      <Text style={styles.subtitle}>Booking functionality coming soon!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
});

export default BookNowScreen;
