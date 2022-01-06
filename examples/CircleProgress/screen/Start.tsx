import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import CircleProgressBar from '../components/CircleProgressBar'

export default function () {
    //possible to props params
    const BORDER_COLOR = '#4649ad'
    const FILL_COLOR = '#d19d60'
    const SIZE_C = 300
    const BORDER_WIDTH = 30
    const progressPercent = 89
    const initialProgress = 5

    return (
        <View style={styles.container}>
            <CircleProgressBar
                progressPercent={progressPercent}
                size={SIZE_C}
                borderWidth={BORDER_WIDTH}
                borderColor={BORDER_COLOR}
                fillColor={FILL_COLOR}
                initialProgressPercent={initialProgress}
                center={
                    <View>
                        <Text style={{fontSize: 24, color: '#1a1a1a'}}>Progress is {progressPercent}%</Text>
                    </View>
                }/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#ffa83c',
        alignItems: 'center'
    },
})
