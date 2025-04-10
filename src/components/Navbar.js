import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Navbar() {
    const navigation = useNavigation();


    return (
        <View style={styles.navbar}>
            <View style={styles.navList}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.navLink}>홈</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('CallHistory')}>
                    <Text style={styles.navLink}>통화 내역</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Report')}>
                    <Text style={styles.navLink}>신고</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Info')}>
                    <Text style={styles.navLink}>정보</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        padding: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.5)',
        backgroundColor: 'white',
    },
    navList: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    navItem: {
        marginHorizontal: 10,
    },
    navLink: {
        color: '#1e1e1e',
        fontSize: 18,
    },
});

export default Navbar;