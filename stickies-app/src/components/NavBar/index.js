import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';


function NavBar({ handleGoToLogin, handleGoToRegister }) {
    return (<>
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => handleGoToLogin()}>
                        <AntDesign name="login" size={48} color="#264653" />
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity onPress={() => handleGoToRegister()}>
                        <FontAwesome5 name="cash-register" size={48} color="#264653" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </>)
};

export default NavBar;