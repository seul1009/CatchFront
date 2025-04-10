import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function CallHistoryScreen() {
    const navigation = useNavigation();
    const [callHistory, setCallHistory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/call-history')
            .then(response => {
                setCallHistory(response.data);
            })
            .catch(error => {
                console.error('Error fetching call history:', error);
            });
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 20 }}>Call History</Text>
            <FlatList
                data={callHistory}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CallDetail', { id: item.id })}
                        style={{ paddingVertical: 10 }}
                    >
                        <Text style={{ fontSize: 18 }}>
                            {item.caller} → {item.receiver} ({item.duration} min) - {item.date}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

export default CallHistoryScreen;
