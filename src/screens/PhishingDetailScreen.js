import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function PhishingDetailScreen({ route }) {
  const { title, content } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  content: { fontSize: 16, lineHeight: 22 },
});

export default PhishingDetailScreen;
