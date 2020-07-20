import React from 'react';
import { View, Text } from 'react-native';

function Header({ title, fontSize = 45 }) {
    return (<>
        <Text style={{
            fontWeight: 'bold',
            fontSize,
            textAlign: 'center',
            color: '#e9c46a'
        }}>{title}</Text>
    </>)
}

export default Header;