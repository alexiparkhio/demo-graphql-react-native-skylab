import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Header, Container, StickyContainer } from '../commons';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

function AddSticky({ user: { name, surname, email }, navigation, addStickyHandler }) {
    const [message, setMessage] = useState('');

    return (<>
        <Container>
            <Header title="Add new Sticky" />
            <StickyContainer style={{ width: '90%' }}>
                <TextInput
                    placeholder="Start writing here!"
                    multiline
                    numberOfLines={3}
                    value={message}
                    onChangeText={input => setMessage(input)}
                />
                <View style={styles.separator}></View>
                <Text>Sticky by {name} {surname} ({email})</Text>
            </StickyContainer>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => addStickyHandler(message, moment(new Date()).format('DD-MM-YYYY, HH:mm'))}>
                    <Ionicons name="ios-add-circle" size={74} color="#f4a261" />
                    <Text style={{ color: '#f4a261', fontSize: 20 }}>Add</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setMessage('')} style={styles.button}>
                    <Ionicons name="ios-remove-circle" size={74} color="#f4a261" />
                    <Text style={{ color: '#f4a261', fontSize: 20 }}>Discard changes</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation('landing')}>
                <Ionicons name="ios-arrow-back" size={74} color="#f4a261" />
            </TouchableOpacity>
        </Container>
    </>)
}

export default AddSticky;