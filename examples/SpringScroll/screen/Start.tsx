import React from 'react'
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native'


const Start = () => {
    const {width, height} = useWindowDimensions()
    return (
        <View style={styles.container}>
            <Text>Hello</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#78bdd0',
    },
})

export default Start

