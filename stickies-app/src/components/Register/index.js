import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Header, Container } from '../commons';
import styles from './styles';

function Register({ navigation, handleRegister }) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (<>
        <Container>
            <View style={styles.boxContainer}>
                <Header title="Register" />
                <TextInput
                    style={styles.textInput}
                    placeholder="Insert your name"
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Insert your surname"
                    onChangeText={text => setSurname(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="example@mail.com"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    placeholder="Insert your password"
                    onChangeText={text => setPassword(text)}
                />

                <View style={styles.buttonsContainer}>
                    <Button style={styles.buttonPadding} title="Submit" onPress={() => handleRegister(name, surname, email, password)} />
                    <Text onPress={() => navigation('login')} style={styles.buttonPadding}>Already a member? Sign in!</Text>
                </View>
            </View>
        </Container>
    </>)
}

export default Register;