import React from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function NewsDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { title, content } = route.params || {};

  const contentLines = content?.split('\n') || [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}> ← </Text>
        </TouchableOpacity>
    </View>
     
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.contentContainer}>
        {contentLines.map((line, index) => {
          if (line.startsWith('□')) {
            return (
              <Text key={index} style={styles.sectionHeader}>
                {line}
              </Text>
            );
          }

          if (line.startsWith(' ◦') || line.startsWith('   ※')) {
            return (
              <Text key={index} style={styles.bulletPoint}>
                {line}
              </Text>
            );
          }

          return (
            <Text key={index} style={styles.paragraph}>
              {line}
            </Text>
          );
        })}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderBottomWidth: 2,
      borderColor: '#355DFF',
    },
  backButton: {
    fontSize: 24,
    color: '#000',
    marginRight: 10,
  },
  container: {
    paddingHorizontal: 20,
  },
  title: {
    marginTop:20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    
  },
  contentContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
    marginBottom: 5,
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
  bulletPoint: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
    marginLeft: 10,
  },
});
