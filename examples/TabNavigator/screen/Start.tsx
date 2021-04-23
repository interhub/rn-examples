import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {SCREEN_NAME_TABS} from '../constants/SCREEN_NAME_TABS'
import TouchableScale from 'react-native-touchable-scale'

const Start = () => {
    const {navigate} = useNavigation()
    const goToDetail = () => {
        navigate(SCREEN_NAME_TABS.ITEM_DETAIL)
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>
                    ELEMENT PAGE
                </Text>
            </View>
            <TouchableScale
                friction={5}
                tension={0.5}
                activeScale={0.9}
                onPress={goToDetail} style={styles.imgBox}>
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={require('../img/bg.jpg')}
                />
            </TouchableScale>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#349f6a'
    },
    text: {fontSize: 15, color: '#fff', fontWeight: 'bold'},
    imgBox: {
        width: 200, height: 300,
    },
    image: {width: '100%', height: '100%', borderRadius: 15}
})

export default Start

