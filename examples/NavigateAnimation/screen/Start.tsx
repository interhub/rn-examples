import React from 'react'
import {Button, Image, StyleSheet, Text, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {SCREEN_NAME_SHARED} from '../constants/SCREEN_NAME_SHARED'

const Start = () => {


    const {navigate} = useNavigation()
    const goToDetail = () => {
        navigate(SCREEN_NAME_SHARED.ITEM_DETAIL)
    }

    return (
        <View style={styles.container}>
            <Button title={'navigate'} onPress={goToDetail}/>
                <Text style={[{fontSize: 40, color: '#000',opacity:0}]}>hello world!</Text>
                <Image source={require('../img/bg.jpg')} style={styles.image}/>
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
        width: 200,
        height: 100,
        borderRadius: 15,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        alignSelf: 'center'
    }
})

export default Start

