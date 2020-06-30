import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions } from 'react-native';
import {
  Login,
  Register,
  Landing,
  NavBar,
  AddSticky
} from './src/components';

export default function App() {
  const [screen, setScreen] = useState('add-sticky');
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

  return (<>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {screen === 'login' && <Login navigation={screenHandler} />}
        {screen === 'register' && <Register navigation={screenHandler} />}
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
