import React from 'react'
import {Button, StyleSheet, View} from 'react-native'
import {useNavigation,} from '@react-navigation/native'
import useGetShowAnimatedStyle from '../config/useGetShowAnimatedStyle'
import Animated, {interpolate} from 'react-native-reanimated'
import ButtonCustom from '../../../components/ButtonCustom'

const LeftScreen = () => {

    const navigation = useNavigation()

    const [imageStyle] = useGetShowAnimatedStyle((setPoints) => {
        'worklet'
        return {
            transform: [{translateX: setPoints(500, 0)}],
        }
    }, {delay: 200})


    const [titleStyle] = useGetShowAnimatedStyle((setPoints) => {
        'worklet'
        return {
            transform: [{translateX: setPoints(500, 0)}],
        }
    }, {delay: 300})

    const [imageStyle1] = useGetShowAnimatedStyle((setPoints) => {
        'worklet'
        return {
            transform: [{scale: setPoints(0, 1)}],
        }
    }, {delay: 400})

    const text = 'Number of repetations that the animation is going to be run for. When negative, the animation will be repeated forever (until the shared value is torn down or the animation is cancelled).Specify whether we should attempt to reverse the animation every other repetition. When true, this will cause the animation to run from the \n\ncurrent value to the destination, after that the same animation will run in the reverse direction.\n'

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <Animated.Image
                    style={[styles.image, imageStyle]}
                    resizeMode="cover"
                    source={require('../img/bg.jpg')}
                />
                {/*<Animated.Text style={[styles.text]}>*/}
                {/*    {text}*/}
                {/*</Animated.Text>*/}
                <Animated.Text style={[styles.text, titleStyle]}>
                    {text}
                </Animated.Text>
                <Animated.Image
                    style={[styles.image, imageStyle1]}
                    resizeMode="cover"
                    source={require('../img/bg.jpg')}
                />
                <ButtonCustom m={10} onPress={navigation.goBack}>
                    back
                </ButtonCustom>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffda38',
    },
    image: {
        width: '100%', height: '30%'
    },
    text: {fontSize: 15, color: '#8e5a1e', fontWeight: 'bold', margin: 20},
})

export default LeftScreen
