import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    separator: {
        height: 2,
        backgroundColor: 'black',
        marginVertical: 10
    },
    buttonsContainer: {
        flex: 1,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        flexDirection: 'column',
        textAlign:'center',
    }
});

export default styles;