import React from 'react'
import {Image, Text, View} from 'react-native'
import MaskedView from '@react-native-community/masked-view'

export default function () {
    return (
        <MaskedView
            style={{flex: 1, flexDirection: 'row', height: '100%'}}
            maskElement={
                <View
                    style={{
                        // Transparent background because mask is based off alpha channel.
                        backgroundColor: 'transparent',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 130,
                            color: 'black',
                            fontWeight: 'bold',
                        }}
                    >
                        Basic Mask
                    </Text>
                </View>
            }
        >
            <Image source={require('./img/bg.jpg')} style={{width: '100%', height: '100%'}}/>
        </MaskedView>
    )
}
