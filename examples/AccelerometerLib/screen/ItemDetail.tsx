import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {useNavigation,} from '@react-navigation/native'
import ButtonCustom from '../../../components/ButtonCustom'

const ItemDetail = () => {

    const {goBack} = useNavigation()

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <ButtonCustom m={10} onPress={goBack}>
                    back
                </ButtonCustom>
                <Text style={[styles.text]}>
                    ELEMENT PAGE
                </Text>
                <Image
                    style={[styles.image]}
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
