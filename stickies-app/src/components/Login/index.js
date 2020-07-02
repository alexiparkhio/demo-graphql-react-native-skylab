import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Header, Container } from '../commons';
import styles from './styles';

function Login({ loginHandler, navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (<>
        <Container>
            <View style={styles.boxContainer}>
                <Header title="Login" />
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
                    <Button style={styles.buttonPadding} title="Submit" onPress={() => loginHandler(email, password)} />
                    <Text onPress={() => navigation('register')} style={styles.buttonPadding}>Not registered? Sign up!</Text>
                </View>
            </View>
        </Container>
    </>)
}

export default Login;