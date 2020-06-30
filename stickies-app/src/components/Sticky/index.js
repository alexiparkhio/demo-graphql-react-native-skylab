import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { StickyContainer } from '../commons';

function Sticky({ content: { message, author, date } }) {
    return (<>
        <StickyContainer>
            <Text style={styles.stickyMessage}>{message}</Text>
            <View style={styles.separator}></View>
            <Text style={styles.stickyAuthor}>Sticky by {author}</Text>
            <Text style={styles.stickyDate}>Published at {date}</Text>
        </StickyContainer>
    </>)
};

export default Sticky;