import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

function Sticky({ content: { message, author, date } }) {
    return (<>
        <View style={styles.stickyContainer}>
            <Text style={styles.stickyMessage}>{message}</Text>
            <View style={styles.separator}></View>
            <Text style={styles.stickyAuthor}>Sticky by {author}</Text>
            <Text style={styles.stickyDate}>Published at {date}</Text>
        </View>
    </>)
};

export default Sticky;