import React, {useEffect, useRef} from 'react'
import ModelView from 'react-native-3d-model-view'
import {StyleSheet} from 'react-native'

const Models3d = () => {
    return (
        <ModelView
            source={{ zip: 'https://github.com/BonnierNews/react-native-3d-model-view/blob/master/example/obj/Hamburger.zip?raw=true' }}
            // onLoadModelStart={}
            // onLoadModelSuccess={this.onLoadModelSuccess}
            // onLoadModelError={this.onLoadModelError}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})


export default Models3d
