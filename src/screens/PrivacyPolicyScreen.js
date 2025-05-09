import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>개인정보 처리 방침</Text>
      </View>
      <View style={styles.separator} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.text}>
          본 애플리케이션은 사용자 개인정보 보호를 최우선으로 생각합니다. 수집된 정보는 안전하게 암호화되어 저장되며, 
          동의 없이 제3자에게 제공되지 않습니다. 개인정보는 서비스 제공 목적에 한해 사용되며, 
          사용자는 언제든지 열람, 수정, 삭제를 요청할 수 있습니다.
        </Text>
        <Text style={styles.text}>
          1. 수집 항목: 이메일, 통화 기록, 보이스피싱 분석 결과 등{'\n'}
          2. 수집 목적: 서비스 제공 및 사용자 보호를 위한 이상 패턴 탐지{'\n'}
          3. 보관 기간: 탈퇴 시 즉시 파기 또는 법령에 따른 보관
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 30,
    backgroundColor: '#fff' 
},
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
