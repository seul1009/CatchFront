import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

const TermsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>이용약관</Text>
      </View>
      <View style={styles.separator} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.text}>
          본 서비스는 사용자의 편의성과 안전을 위하여 통화 분석 및 보이스피싱 위험 탐지 기능을 제공합니다. 
          사용자는 본 서비스를 사용하는 데 있어 다음 조건에 동의하게 됩니다.
        </Text>
        <Text style={styles.text}>
          1. 서비스 목적: 통화 내역 기반 위험 탐지 및 경고 제공{'\n'}
          2. 사용자의 책임: 앱 사용 중 발생하는 데이터는 사용자의 동의 하에 수집되며, 
          사용자는 허위 신고 또는 악용을 하지 않아야 합니다.{'\n'}
          3. 서비스 변경 및 종료: 서비스 제공자는 사전 고지 후 서비스의 일부 또는 전체를 변경 또는 종료할 수 있습니다.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 30,
    backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    fontSize: 24,
    color: '#000',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd', 
  },
  scrollContent: {
    padding: 20,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    color: '#444',
    marginBottom: 16,
  },
});
