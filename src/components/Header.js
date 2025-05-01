import { View, Text, StyleSheet } from 'react-native';

function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.logo}>Catch</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.5)',
        backgroundColor: '#fff',
      },
    logo: {
        color: '#355DFF',
        paddingLeft: 20,
        paddingTop: 30,
        fontSize: 35,
        fontWeight: '700',
    }
});

export default Header;
