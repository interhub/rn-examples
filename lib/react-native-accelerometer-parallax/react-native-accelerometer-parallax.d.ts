declare module 'react-native-accelerometer-parallax' {
    export const ParallaxProvider = (children: any) => JSX.Element

    export type ParallaxConfig = {
        speed?: number
    }

    export const useParallax = (config: ParallaxConfig) => any
}

