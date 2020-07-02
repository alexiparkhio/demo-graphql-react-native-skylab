import React, { useEffect, useState } from 'react';
import { Text, View, Alert, Image, TouchableOpacity } from 'react-native';
import { Header, Container } from '../commons';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import circle from '../../../assets/circle.jpg';

function Map({ user, navigation }) {
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        })
    }, [])

    return (<>
        <Container>
            <Header title="Aquí están sus genitales:" />
            {latitude ? (<>
                <View style={styles.mapContainer}>
                    <MapView
                        style={{ height: '100%', width: '100%' }}
                        initialRegion={{
                            latitude,
                            longitude,
                            latitudeDelta: 0.001922,
                            longitudeDelta: 0.000821,
                        }}
                        
                    >
                        <Marker
                            coordinate={{ latitude, longitude }}
                            title={`Hello, ${user.name}!`}
                            description={`This is your email: ${user.email}`}
                            
                        >
                            <Callout onPress={() => Alert.alert("Chupate esa pringao")}>
                                <View style={{ flex: 1, height: '100%' }}>
                                    <Text style={{
                                        flex: 1,
                                        height: '100%',
                                        fontSize: 250
                                    }}>
                                        <Image source={circle} style={{
                                            width: 250,
                                            height: 250
                                        }} />
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>
                    </MapView>
                </View>
            </>) : <Text style={styles.loadingText}>Loading map...</Text>}

            <TouchableOpacity onPress={() => navigation('landing')}>
                <Ionicons name="ios-arrow-back" size={74} color="#f4a261" />
            </TouchableOpacity>

        </Container>
    </>)
}

export default Map;