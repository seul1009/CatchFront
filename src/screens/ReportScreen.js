import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import styles from '../assets/fonts/font';

function ReportScreen() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/report')
            .then((response) => response.text())
            .then((data) => {
                console.log(data);
                setMessage(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <View>
            <Text style={styles.font1}>보이스피싱 의심 전화번호</Text>
            <Text style={styles.font2}>신고</Text>
            <Text style={styles.font1}>하기</Text>
            <Text>{message}</Text>
        </View>
    );
}

export default ReportScreen;
