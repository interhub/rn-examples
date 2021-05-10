# React Native Accelerometer Parallax 🍻

### Simple Accelerometer animation react-native library for animate translateXY some View RN for IOS and Android 🍎 🤖

Library stand by expo-sensors and react-native-reanimated. Now you can see first versions library, but it's going to
grow up and more. 

![video example not load 🤖](http://interhub.github.io/source/parallax-lib.gif)

# Install

1. Install last version [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) (v2.0.0
   or more)

2. Install library

> yarn add react-native-accelerometer-parallax

# Usage

### 1. Wrap your root App.tsx to ParallaxProvider to provide context value for hooks.

```tsx
import React from 'react'
import {ParallaxProvider} from 'react-native-accelerometer-parralax'

const App = () => {
    return <ParallaxProvider>
        <SomeStack/>
    </ParallaxProvider>
}

export default App

```

### 2. Get context value to use animated value (hook shared value from [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated))

```tsx
import {useParallax} from 'react-native-accelerometer-parralax'


const Screen = () => {
    const {animStyle} = useParallax()

    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Parralax text test</Text>
    </View>
}

```

### 3. Wrap your some component to Animated.View from [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) and pass animated style to style prop

```tsx 
import {useParallax} from 'react-native-accelerometer-parralax'
import Animated from 'react-native-reanimated'


const Screen = () => {
    const {animStyle} = useParallax()

    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.View style={animStyle}>
            <Text>Parralax text test</Text>
        </Animated.View>
    </View>
}

```

### 4. Final - ✨📲 Look at work view motion!

# Documentation.

### 1. useParallax(config: **ParallaxConfig**): **ParallaxObject**

**ParallaxConfig**

- speed: number - (default 1, speed for sensitivity accelerometer rotate and animate size move)

- //TODO sensitivity, sensitivityX, sensitivityY, speedX, speedY, tensor, scale, clamp, maxOffset (x,y,z)

**ParallaxObject**

- animStyle: {transform:[{translateX: number},{translateY: number}]} (for pass to Animated.View style prop)

- posX: Animated.SharedValue<number> (for use it or interpolate, for example style={{opacity: posY.value}})

- posY: Animated.SharedValue<number> (equal posX) 
