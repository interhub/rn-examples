import React from 'react'
import {Button, Image, StyleSheet, Text, View} from 'react-native'
import {useNavigation, useRoute, useNavigationState,} from '@react-navigation/native'
import useGetShowAnimatedStyle from '../config/useGetShowAnimatedStyle'
import Animated, {interpolate} from 'react-native-reanimated'

const ItemDetail = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const state = useNavigationState(state => state)
    // console.log(navigation, 'navigation')
    // console.log(route, 'route')
    // console.log(state, 'state')

    const [imageStyle] = useGetShowAnimatedStyle((shared, inputRange) => {
        'worklet'
        return {
            transform: [{translateY: interpolate(shared.value, inputRange, [300, 0])}],
        }
    }, {delay: 200})

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <Button title={'back'} onPress={navigation.goBack}/>
                <Text style={styles.text}>
                    ELEMENT PAGE
                </Text>
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
