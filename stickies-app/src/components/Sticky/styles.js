import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    stickyContainer: {
        backgroundColor: '#f4a261',
        marginVertical: 20,
        padding: 15,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 5
    },
    stickyMessage: {
        fontSize: 20,
        marginVertical: 15
    },
    stickyAuthor: {
        fontWeight: 'bold'
    },
    stickyDate: {
        fontStyle: 'italic'
    },
    separator: {
        height: 2,
        backgroundColor: 'black',
        marginVertical: 10
    }
})

export default styles;