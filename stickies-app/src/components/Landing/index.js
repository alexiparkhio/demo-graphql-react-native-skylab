import React, { useState } from 'react';
import { View, FlatList, Text, ScrollView, Image } from 'react-native';
import styles from './styles';
import { Sticky } from '../';
import { Header, Container } from '../commons';
import circle from '../../../assets/circle.jpg';

function Landing({ user, stickies }) {
    console.log(stickies);
    return (<>
        <ScrollView>
            <Container height='88%'>
                <View style={styles.header}>
                    <Header title={`Welcome, ${user.name}!`} />
                </View>

                <View style={styles.stickiesContainer}>
                    {stickies && stickies.length ? (<>
                        <FlatList
                            data={stickies}
                            renderItem={({ item: sticky }) => <Sticky content={sticky} />}
                        />
                    </>)
                        : (<Text style={styles.noStickiesText}>No stickies to display :^(</Text>)}
                </View>

                <Image source={circle} style={styles.circle} />
            </Container>
        </ScrollView>
    </>)
}

export default Landing;