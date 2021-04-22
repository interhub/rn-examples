import React from 'react'
import {Button, Image, StyleSheet, Text, View} from 'react-native'
import {useNavigation, useRoute, useNavigationState,} from '@react-navigation/native'
import useGetShowAnimatedStyle from '../config/useGetShowAnimatedStyle'
import Animated, {interpolate} from 'react-native-reanimated'

const ItemDetail = () => {

    const navigation = useNavigation()

    const [imageStyle] = useGetShowAnimatedStyle((shared, inputRange) => {
        'worklet'
        return {
            transform: [{translateY: interpolate(shared.value, inputRange, [600, 0])}],
        }
    }, {delay: 200})

    const [titleStyle] = useGetShowAnimatedStyle((shared, inputRange) => {
        'worklet'
        return {
            transform: [{translateY: interpolate(shared.value, inputRange, [-600, 0])}],
        }
    }, {delay: 100})

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <Button title={'back'} onPress={navigation.goBack}/>
                <Animated.Text style={[styles.text, titleStyle]}>
                    ELEMENT PAGE
                </Animated.Text>
                <Animated.Image
                    style={[styles.image, imageStyle]}
                    resizeMode="cover"
                    source={require('../img/bg.jpg')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffda38',
    },
    image: {
        width: '100%', height: '30%'
    },
    text: {fontSize: 30, color: '#FFF', fontWeight: 'bold'},
})

export default ItemDetail
