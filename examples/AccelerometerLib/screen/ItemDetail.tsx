import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {useNavigation,} from '@react-navigation/native'
import ButtonCustom from '../../../components/ButtonCustom'
import {useParallax} from 'react-native-accelerometer-parallax'
import Animated from 'react-native-reanimated'
import SIZE from '../../../src/SIZE'
 
const ItemDetail = () => {

    const {goBack} = useNavigation()
    const {animStyle} = useParallax({speed: 0.5})

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <ButtonCustom m={10} onPress={goBack}>
                    back
                </ButtonCustom>
                <Text style={[styles.text]}>
                    ELEMENT PAGE
                </Text>
                <Animated.View style={animStyle}>
                    <Image
                        style={[styles.image]}
                        resizeMode="cover"
                        source={require('../img/bg.jpg')}
                    />
                </Animated.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dddddd',
    },
    image: {
        width: SIZE.width * 0.8, height: SIZE.width / 2
    },
    text: {fontSize: 30, color: '#FFF', fontWeight: 'bold'},
})

export default ItemDetail
