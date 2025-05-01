import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Header from "../components/Header";

const InfoScreen = () => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://192.168.0.4:8080/api/info', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        setUser(response.data);
      } catch (error) {
        if (error && typeof error === 'object' && 'message' in error) {
          console.error('Error fetching call history:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Header/>

      <View style={styles.infoBox}>
        <View style={styles.row}>
          <Text style={styles.label}>사용자 이름</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>이메일</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>비밀번호 변경</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerText}>이용약관</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerText}>개인정보 처리 방침</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  infoBox: {
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#ddd',
    paddingVertical: 10, marginBottom: 30,
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 12, paddingHorizontal: 4,
  },
  label: { fontSize: 16, color: '#555' },
  value: { fontSize: 16, fontWeight: '600', color: '#111' },
  button: {
    backgroundColor: '#ccc', alignSelf: 'center',
    paddingVertical: 8, paddingHorizontal: 20, borderRadius: 8, marginBottom: 40,
  },
  buttonText: { color: '#000', fontWeight: 'bold' },
  footer: { borderTopWidth: 1, borderColor: '#eee' },
  footerItem: { paddingVertical: 16, borderBottomWidth: 1, borderColor: '#eee' },
  footerText: { fontSize: 16, textAlign: 'center', color: '#333' },
});
