import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { StickyContainer } from '../commons';
import moment from 'moment';

function Sticky({ content: { message, author: { name, surname, email }, created } }) {
    return (<>
        <StickyContainer>
            <Text style={styles.stickyMessage}>{message}</Text>
            <View style={styles.separator}></View>
            <Text style={styles.stickyAuthor}>Sticky by {name} {surname} ({email})</Text>
            <Text style={styles.stickyDate}>Published {moment(created, 'DD-MM-YYYY, hh:mm').fromNow()}</Text>
        </StickyContainer>
    </>)
};

export default Sticky;