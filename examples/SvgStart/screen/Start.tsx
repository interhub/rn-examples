import React from 'react'
import Svg, {Circle, Path, Rect} from 'react-native-svg'
import {StyleSheet, useWindowDimensions, View} from 'react-native'


const Start = () => {
    const {width, height} = useWindowDimensions()
    return (
        <View style={styles.container}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100">
                <Circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="blue"
                    strokeWidth="2.5"
                    fill="green"
                />
                <Rect
                    x="15"
                    y="15"
                    width="70"
                    height="70"
                    stroke="red"
                    strokeWidth="2"
                    fill="yellow"
                />
                <Path d={'M 0 0 L 100 100'} stroke={'#4649ad'} strokeWidth={10}/>
            </Svg>
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
    imgBox: {
        width: 200, height: 300,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        shadowOpacity: 0.5,
        shadowRadius: 10
    }
})

export default Start

