import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

function CallDetailScreen() {
  const route = useRoute();
  const { id } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`http://192.168.0.4:8080/api/call-history/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching call detail:', error);
      }
    };
  
    fetchData();
  }, [id]);

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageBubble,
      item.sender === 'user' ? styles.user : styles.other
    ]}>
      <Text style={styles.text}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>통화 내용</Text>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#355DFF', marginBottom: 16 },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 6,
    borderRadius: 10,
  },
  text: { fontSize: 16 },
  user: {
    backgroundColor: '#355DFF',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  other: {
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
});

export default CallDetailScreen;
