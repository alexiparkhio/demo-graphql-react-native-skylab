import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions } from 'react-native';
import {
  Login,
  Register,
  Landing,
  NavBar
} from './src/components';

export default function App() {
  const [screen, setScreen] = useState('login');
  const [user, setUser] = useState({ name: 'Pepito', surname: 'Grillo', email: 'pepigri@gmail.com' });
  const [navBar, setNavBar] = useState(false);

  useEffect(() => {
    if (screen === 'landing') setNavBar(true);
  }, [])

  const goToLogin = () => {
    setScreen('login');
    setNavBar(false);
  }

  const goToRegister = () => {
    setScreen('register');
    setNavBar(false);
  }

  const goToLanding = () => {
    setNavBar(true);
    setScreen('landing');
  }

  return (<>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {screen === 'login' && <Login handleGoToRegister={goToRegister} handleLogin={goToLanding}/>}
        {screen === 'register' && <Register handleGoToLogin={goToLogin} />}
        {screen === 'landing' && <Landing user={user} />}
        {navBar && <NavBar handleGoToLogin={goToLogin} handleGoToRegister={goToRegister} />}
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
