import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';


function NavBar({ navigation, onLogout }) {
    return (<>
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => onLogout()}>
                        <AntDesign name="login" size={48} color="#264653" />
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation('add-sticky')}>
                    <MaterialIcons name="note-add" size={48} color="#264653" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </>)
};

export default NavBar;