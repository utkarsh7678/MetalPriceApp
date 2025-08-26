import React from 'react';
import { View, StyleSheet } from 'react-native';
import LandingPage from '../../screens/LandingPage';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LandingPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
});
