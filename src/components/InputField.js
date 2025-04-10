import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ value, onChange, required, placeholder, secureTextEntry }) => {
    return (
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            required={required}
        />
    );
};


const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
});

export default InputField;