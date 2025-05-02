import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Header from "../components/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';

function CallHistoryScreen() {
  const navigation = useNavigation();
  const [callHistory, setCallHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://192.168.0.4:8080/api/call-history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCallHistory(response.data);
      } catch (error) {
        if (error && typeof error === 'object' && 'message' in error) {
          console.error('Error fetching call history:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };
  
    fetchData();
  }, []);

  return (
    <> 
    <Header/>
    <View style={styles.container}>
      <Text style={styles.header}>통화 내역</Text>
      <FlatList
        data={callHistory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CallDetail', { id: item.id })}
            style={styles.item}
          >
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.number}>{item.phoneNumber}</Text>
            <Text style={styles.percent}>보이스피싱 확률 {item.vishingPercent}%</Text>
            <Text style={styles.button}>내용 보기</Text>
          </TouchableOpacity>
        )}
      />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#355DFF', marginBottom: 16 },
  item: {
    padding: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  date: { fontSize: 14, color: '#888' },
  number: { fontSize: 16, fontWeight: 'bold' },
  percent: { color: 'red', fontWeight: 'bold', marginTop: 4 },
  button: {
    marginTop: 8,
    alignSelf: 'flex-end',
    backgroundColor: '#eee',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    fontSize: 12,
  },
});

export default CallHistoryScreen;
