import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/img/catch.png')}
        style={styles.logo}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingLeft: 25,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  logo: {
    width: 85,
    height: 70,
    resizeMode: 'contain',
  },
});

export default Header;
