import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, AsyncStorage } from 'react-native';
import {
  Login,
  Register,
  Landing,
  NavBar,
  AddSticky
} from './src/components';
import logic, { registerUser } from 'stickies-client-logic';

logic.context.API_URL = 'http://192.168.0.20:8080/graphql';
logic.context.storage = AsyncStorage;

export default function App() {
  const [screen, setScreen] = useState('login');
  const [user, setUser] = useState({ name: 'Pepito', surname: 'Grillo', email: 'pepigri@gmail.com' });
  const [navBar, setNavBar] = useState(false);

  useEffect(() => {
    if (screen === 'landing') setNavBar(true);
  }, [])

  const screenHandler = screenToSwitch => {
    if (screenToSwitch === 'landing') setNavBar(true);
    else setNavBar(false);

    setScreen(screenToSwitch);
  }

  const handleRegister = (name, surname, email, password) => {
    try {
      (async() => {
        await registerUser(name, surname, email, password);

        setScreen('login');
      })();
    } catch ({ message }) {
      console.error(message);
    }
  }

  return (<>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {screen === 'login' && <Login navigation={screenHandler} />}
        {screen === 'register' && <Register navigation={screenHandler} handleRegister={handleRegister} />}
        {screen === 'landing' && <Landing user={user} />}
        {screen === 'add-sticky' && <AddSticky user={user} navigation={screenHandler} />}
        {navBar && <NavBar navigation={screenHandler} />}
      </View>
    </SafeAreaView>
  </>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#264653',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
