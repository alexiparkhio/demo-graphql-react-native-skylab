import React from 'react';
import { View } from 'react-native';

function StickyContainer({ children, style = {} }) {
    return (<>
        <View style={[{
            backgroundColor: '#f4a261',
            marginVertical: 20,
            padding: 15,
            shadowColor: '#fff',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1,
            elevation: 5
        }, style]}>
            {children}
        </View>
    </>)
}

export default StickyContainer;