import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/img/logo.png')}
        style={[styles.logo, { tintColor: '#355DFF' }]}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingTop: 10,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.5)',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  logo: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
  },
});

export default Header;
