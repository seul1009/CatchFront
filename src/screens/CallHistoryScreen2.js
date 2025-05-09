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
          headers: { Authorization: `Bearer ${token}` },
        });
        setCallHistory(response.data);
      } catch (error) {
        console.error('Error fetching call history:', error?.message || error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { flex: 1 }]}>{item.date}</Text>
      <Text style={[styles.cell, { flex: 1.5 }]}>{item.phoneNumber}</Text>
      <Text style={[styles.cell, item.vishingPercent >= 60 && styles.red, { flex: 1.5 } ]} >{`피싱 확률 ${item.vishingPercent}%`} </Text>
      <TouchableOpacity onPress={() => navigation.navigate('CallDetail', { id: item.id })} style={{ flex: 1 }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>내용 보기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>통화 내역</Text>
        <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 1 }]}>날짜</Text>
            <Text style={[styles.headerCell, { flex: 1.5 }]}>전화번호</Text>
            <Text style={[styles.headerCell, { flex: 1.5 }]}>보이스피싱 확률</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>통화 내용</Text>
        </View>
        <FlatList
          data={callHistory}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#355DFF',
    marginBottom: 15,
    paddingLeft: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 8,
    borderColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  cell: {
    flex: 1,
    fontSize: 13,
    textAlign: 'center',
  },
  red: {
    color: 'red',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#eee',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CallHistoryScreen;
