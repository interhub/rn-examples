import React, {useState} from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import CircleProgressBar from '../components/CircleProgressBar'
import ButtonCustom from '../../../components/ButtonCustom'

export default function () {
    //possible to props params
    const BORDER_COLOR = '#4649ad'
    const FILL_COLOR = '#d19d60'
    const SIZE_C = 300
    const BORDER_WIDTH = 30
    const initialProgress = 5

    const [progressValue, setProgressValue] = useState(95)
    const values = [0, 10, 30, 50, 65, 93, 98, 100].reverse()

    return (
        <ScrollView contentContainerStyle={{paddingBottom: 150, paddingTop: 10}} style={styles.scrollBox}>
            <View style={styles.circleContainer}>
                <CircleProgressBar
                    progressPercent={progressValue}
                    size={SIZE_C}
                    borderWidth={BORDER_WIDTH}
                    borderColor={BORDER_COLOR}
                    fillColor={FILL_COLOR}
                    initialProgressPercent={initialProgress}
                    center={
                        <View>
                            <Text style={{fontSize: 24, color: '#1a1a1a'}}>Progress is {progressValue}%</Text>
                        </View>
                    }/>
            </View>
            {values.map((val, i) => {
                return <ButtonCustom color={BORDER_COLOR} m={10} key={i} onPress={() => setProgressValue(val)}>
                    {val}
                </ButtonCustom>
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollBox: {
        backgroundColor: '#ffa83c',
    },
    circleContainer: {
        // flex: 1,
        alignItems: 'center'
    },
})
