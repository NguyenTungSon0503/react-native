import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Platform.OS === 'ios' ? '#007AFF' : '#4CAF50',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    borderBottomColor: '#A9A9A9',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
