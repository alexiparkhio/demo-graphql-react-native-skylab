import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './styles';

function Login({ handleGoToRegister, handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (<>
        <View style={styles.container}>
            <View style={styles.boxContainer}>
                <Text style={styles.header}>Login</Text>
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
                    <Button style={styles.buttonPadding} title="Submit" onPress={() => handleLogin()} />
                    <Text onPress={() => handleGoToRegister()} style={styles.buttonPadding}>Not registered? Sign up!</Text>
                </View>
            </View>

        </View>
    </>)
}

export default Login;