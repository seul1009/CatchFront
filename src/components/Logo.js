import React from 'react';
import { Image, StyleSheet } from 'react-native';
import logoImage from '../assets/img/logo.png';

export default function Logo(props) {
  return (
    <Image
      source={logoImage}
      style={[styles.logo, props.style]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 180,
    height: 180,
  },
});
