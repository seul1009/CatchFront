import React, { useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

function CallDetailScreen() {
    const { id } = useRoute().params;
    const [callDetail, setCallDetail] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetch(`http://localhost:8080/api/call-history/${id}`)
            .then(response => response.json())
            .then(data => setCallDetail(data))
            .catch(error => console.error('Error fetching call details:', error));
    }, [id]);

    if (!callDetail) return <Text>Loading...</Text>;

    return (
        <View style={{ padding: 20 }}>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 20 }}>Call Detail</Text>
            <View>
                {callDetail.messages.map((msg, index) => (
                    <Text
                        key={index}
                        style={{ textAlign: msg.sender === 'caller' ? 'left' : 'right', marginBottom: 10 }}
                    >
                        {msg.text}
                    </Text>
                ))}
            </View>
        </View>
    );
}

export default CallDetailScreen;
