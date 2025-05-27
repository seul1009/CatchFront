import React from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function NewsDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { title, content } = route.params || {};
  const contentLines = content?.split('\n') || [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.category}>보이스피싱 사례</Text>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.divider} />

        <View style={styles.contentContainer}>
          {contentLines.map((line, index) => {
            if (line.trim() === '') return null;

            if (line.startsWith('□')) {
              return (
                <Text key={index} style={styles.sectionHeader}>
                  {line.trim()}
                </Text>
              );
            }

            if (line.startsWith(' ◦')) {
              return (
                <Text key={index} style={styles.bulletPoint}>
                  {line.trim()}
                </Text>
              );
            }

            if (line.startsWith('   ※')) {
              return (
                <Text key={index} style={styles.warningNote}>
                  {line.trim()}
                </Text>
              );
            }

            return (
              <Text key={index} style={styles.paragraph}>
                {line.trim()}
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: 24,
    color: '#000',
    marginRight: 10,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  category: {
    fontSize: 15,
    color: '#355DFF',
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  contentContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  paragraph: {
    fontSize: 17,
    lineHeight: 30,
    color: '#333',
    marginBottom: 18,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#E9F0FF',
    padding: 12,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 16,
    color: '#003399',
  },
  bulletPoint: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    marginLeft: 14,
    lineHeight: 26,
  },
  warningNote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#777',
    marginBottom: 14,
    marginLeft: 22,
    lineHeight: 24,
  },
});
