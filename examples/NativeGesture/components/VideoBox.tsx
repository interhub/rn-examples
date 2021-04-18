import { Video } from 'expo-av';
import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function VideoBox() {
    const video = React.useRef<Video>(null);
    const [status, setStatus] = React.useState(false);
    return (

        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                useNativeControls={false}
                resizeMode="contain"
                isLooping
            />
            <View style={styles.buttons}>
                <Button
                    title={status ? 'Pause' : 'Play'}
                    onPress={() => {
                        setStatus(!status)
                        status ? video.current?.pauseAsync() : video.current?.playAsync()
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    video: {
        width: 300, height: 200
    },
    buttons: {
        height: 200
    }
});
