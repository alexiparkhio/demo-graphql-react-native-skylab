import React, { useState } from 'react';
import { View, FlatList, Text, ScrollView, Image } from 'react-native';
import styles from './styles';
import { stickies } from '../../../assets/stickies';
import { Sticky } from '../';
import circle from '../../../assets/circle.jpg';

function Landing({ user }) {

    return (<>
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.header}>Welcome, {user.name}!</Text>
                </View>

                <View style={styles.stickiesContainer}>
                    <FlatList
                        data={stickies}
                        renderItem={({ item: sticky }) => <Sticky content={sticky} />}
                    />
                </View>

                <Image source={circle} style={styles.circle} />
            </View>
        </ScrollView>
    </>)
}

export default Landing;