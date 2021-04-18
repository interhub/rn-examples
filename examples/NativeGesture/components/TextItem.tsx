import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

const TextItem = () => {
    const { height, width } = useWindowDimensions()
    const SIZE = width
    return <View style={{ borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', width: SIZE, height: SIZE * 4, backgroundColor: '#4649ad', }} >
        <Text style={{ color: '#fff', }} >
            Hello world!
      </Text>
    </View>
}


export default TextItem

