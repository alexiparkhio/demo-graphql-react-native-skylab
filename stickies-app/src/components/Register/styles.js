import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        fontSize: 45,
        textAlign: 'center',
        color: '#e9c46a'
    },
    boxContainer: {
        borderRadius: 50,
        marginTop: 50,
        padding: 45,
        borderWidth: 2,
        borderColor: 'grey',
        backgroundColor: '#2a9d8f'
    },
    textInput: {
        backgroundColor: 'white',
        marginVertical: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        fontSize: 20,
        borderWidth: 2,
        borderColor: 'grey'
    },
    buttonPadding: {
        marginVertical: 7.5,
        fontSize: 20
    }
});

export default styles;