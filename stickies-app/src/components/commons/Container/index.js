import React from 'react';
import { View } from 'react-native';

/**
 * The best component for panteras
 */
function Container ({ children, height = '100%' }) {
    return (<>
        <View style={{
            flex: 1,
            alignItems: 'center',
            height
        }}>{children}</View>
    </>)
}

export default Container;