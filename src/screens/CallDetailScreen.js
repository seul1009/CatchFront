import React, { useEffect, useState, useCallback  } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation, useFocusEffect  } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import api from '../components/api';

function CallDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const [messages, setMessages] = useState([]);

  useFocusEffect(
    useCallback(() => {
    const fetchData = async () => {
      try { 
        const response = await api.get(`/call-history/${id}`);
        setMessages(response.data.messages);
      } catch (error) {
        if (error.response?.status === 403 || error.response.status === 401){
          console.log('세션 만료');
        } else {
            console.error('통화 내용 불러오기 실패:', error.message);
        }
      }
    };
  
    fetchData();
  }, [id])
);

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageBubble,
      item.sender === 'user' ? styles.user : styles.other
    ]}>
      <Text
      style={[
        styles.text,
        item.sender === 'user' ? styles.userText : styles.otherText,
      ]}
    >
      {item.content}
    </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}> 
      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Catch</Text>
        </View>

      <View style={styles.container}>
        <Text style={styles.title}>통화 내용</Text>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: 24,
    color: '#000',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#355DFF',
  },
  container: { flex: 1,
    backgroundColor: '#fff',
    padding: 20 
  },
  title: { fontSize: 24,
    fontWeight: 'bold',
    color: '#355DFF',
    marginBottom: 16
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 6,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  otherText: {
    color: '#000000',
  },
  user: {
    backgroundColor: '#578CFF',
    
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  other: {
    backgroundColor: '#E4E4E4',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
});

export default CallDetailScreen;
