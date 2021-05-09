declare module 'react-native-accelerometer-parallax' {
    import React from 'react'
    export const ParallaxProvider = (children: React.ReactNode) => any

    export type ParallaxConfig = {
        speed?: number
    }

    export const useParallax = (config: ParallaxConfig) => any
}

