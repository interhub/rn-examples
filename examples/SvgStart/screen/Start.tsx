import React from 'react'
import Svg, {Circle, Path, Rect} from 'react-native-svg'
import {StyleSheet, useWindowDimensions, View} from 'react-native'


const Start = () => {
    const r = 100
    const circle = r * (Math.PI * 2)
    const alpha = Math.PI / 4
    const strokeDashoffset = r * alpha

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
            {/*<Svg width={SIZE.width} height={SIZE.width}>*/}
            {/*    <Defs>*/}
            {/*        <LinearGradient id={'grad'} x1={'0'} y1={'0'} x2={'0'} y2={'100%'}>*/}
            {/*            <Stop offset={'0'} stopColor={theme.brandPrimary} />*/}
            {/*            <Stop offset={'0.5'} stopColor={theme.brandPrimary} />*/}
            {/*            <Stop offset={'1'} stopColor={theme.listNoteColor} />*/}
            {/*        </LinearGradient>*/}
            {/*    </Defs>*/}
            {/*    <Circle*/}
            {/*        cx={SIZE.width / 2}*/}
            {/*        cy={SIZE.width / 2}*/}
            {/*        strokeLinecap={'round'}*/}
            {/*        strokeWidth={40}*/}
            {/*        stroke={'url(#grad)'}*/}
            {/*        strokeDasharray={`${circle} ${circle}`}*/}
            {/*        strokeDashoffset={strokeDashoffset}*/}
            {/*        r={r}*/}
            {/*    />*/}
            {/*</Svg>*/}
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

