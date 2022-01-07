import React from 'react'
import { useEngine } from '@babylonjs/react-native';
import { Engine, Scene } from '@babylonjs/core';
import {useEffect} from 'react'

const MyComponent = (props: {}) => {
    const engine = useEngine();

    useEffect(() => {
        // if (engine) {
        // const scene = new Scene(engine);
        // Setup the scene!
        // }
    }, [])

    return (
        <>
        </>
    )
}

export default MyComponent
