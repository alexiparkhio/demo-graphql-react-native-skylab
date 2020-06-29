import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: '88%',
        alignItems: 'center',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 45,
        textAlign: 'center',
        color: '#e9c46a',
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
        borderRadius: '50%'
    }
});

export default styles;