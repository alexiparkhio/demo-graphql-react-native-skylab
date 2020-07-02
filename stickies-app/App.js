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

const logic = require('./stickies-client-logic');
const { registerUser, authenticateUser, retrieveUser, retrieveStickies } = logic;

logic.context.API_URL = 'http://192.168.0.20:8080/graphql';
logic.context.storage = AsyncStorage;

console.disableYellowBox = true;

export default function App() {
  const [screen, setScreen] = useState('login');
  const [user, setUser] = useState();
  const [navBar, setNavBar] = useState(false);
  const [stickies, setStickies] = useState([]);

  useEffect(() => {
    if (screen === 'landing') setNavBar(true);
  }, [])

  useEffect(() => {
    return retrieveStickies()
      .then(stickies => {
        setStickies(stickies)
      });
  }, []);

  const screenHandler = screenToSwitch => {
    if (screenToSwitch === 'landing') setNavBar(true);
    else setNavBar(false);

    setScreen(screenToSwitch);
  }

  const handleRegister = (name, surname, email, password) => {
    try {
      (async () => {
        await registerUser(name, surname, email, password);

        setScreen('login');
      })();
    } catch ({ message }) {
      console.error(message);
    }
  }

  const handleLogin = (email, password) => {
    try {
      (async () => {
        await authenticateUser(email, password)

        const user = await retrieveUser();
        setUser(user);

        setScreen('landing');
        setNavBar(true);
      })();
    } catch ({ message }) {
      console.error(message)
    }
  }

  const logoutHandler = () => {
    (async() => {
      await AsyncStorage.clear();
      logic.context.storage.clear();

      setScreen('login');
      setNavBar(false);
    })()
  }

  return (<>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {screen === 'login' && <Login navigation={screenHandler} loginHandler={handleLogin} />}
        {screen === 'register' && <Register navigation={screenHandler} handleRegister={handleRegister} />}
        {screen === 'landing' && <Landing user={user} stickies={stickies} />}
        {screen === 'add-sticky' && <AddSticky user={user} navigation={screenHandler} />}
        {navBar && <NavBar navigation={screenHandler} onLogout={logoutHandler} />}
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
