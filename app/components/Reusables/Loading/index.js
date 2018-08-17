import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
