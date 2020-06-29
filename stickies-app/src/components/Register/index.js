import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './styles';

function Register({ handleGoToLogin }) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleRegister () {
        console.log(name, surname, email, password);
    }

    return (<>
        <View style={styles.container}>
            <View style={styles.boxContainer}>
                <Text style={styles.header}>Register</Text>
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
                    <Button style={styles.buttonPadding} title="Submit" onPress={() => handleRegister()} />
                    <Text onPress={() => handleGoToLogin()} style={styles.buttonPadding}>Already a member? Sign in!</Text>
                </View>
            </View>

        </View>
    </>)
}

export default Register;