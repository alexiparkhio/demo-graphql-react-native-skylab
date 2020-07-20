import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    header: {
        borderColor: 'plum',
        borderWidth: 10,
        borderStyle: 'dashed',
        borderRadius: 30,
        margin: 10
    },
    boxContainer: {
        borderRadius: 50,
        marginTop: 50,
        padding: 45,
        borderWidth: 2,
        borderColor: 'grey',
        backgroundColor: '#2a9d8f'
    },
    stickiesContainer: {
        width: '90%'
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 200
    },
    noStickiesText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#f4a261'
    }
});

export default styles;