import React, {useEffect, useRef} from 'react'
import {Animated, StyleSheet, Text, View} from 'react-native'
import * as faker from 'faker'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

type MessageType = { username: string, text: string, avatar: string }
const messages: MessageType[] = new Array(50).fill(1).map((_, i) => {
    return {
        avatar: faker.random.image(),
        text: faker.lorem.paragraphs(2),
        username: faker.name.firstName() + ' ' + faker.name.lastName()
    }
})

const AVATAR_ICON_SIZE = 35
const MESSAGE_BETWEEN_MARGIN = 8

const ChatAvatarInterpolate = () => {
    const {bottom: bottomInsert} = useSafeAreaInsets()
    const scrollY = useRef(new Animated.Value(0)).current
    console.log({bottomInsert})
    useEffect(() => {

    }, [])

    return (
        <View style={styles.container}>
            <Animated.FlatList<MessageType>
                contentContainerStyle={{paddingTop: bottomInsert}}
                initialNumToRender={15}
                inverted
                keyExtractor={(iten, index) => String(index)}
                data={messages}
                renderItem={({item, index}) => {
                    return <MessageBlock {...item} />
                }}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: false})}/>
        </View>
    )
}

const MessageBlock = ({avatar, username, text}: MessageType) => {
    return <View style={styles.messageBlock}>
        <View style={styles.avatarBox}>
            <Animated.Image style={styles.avatar} source={{uri: avatar}}/>
        </View>
        <View style={styles.textBox}>
            <Text style={{color: '#fff'}}>{text}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111a32',
        paddingHorizontal: MESSAGE_BETWEEN_MARGIN
    },
    messageBlock: {
        flexDirection: 'row',
    },
    avatar: {
        width: AVATAR_ICON_SIZE,
        height: AVATAR_ICON_SIZE,
        borderRadius: AVATAR_ICON_SIZE / 2,
    },
    textBox: {
        padding: 10,
        backgroundColor: 'rgba(12,77,119,0.73)',
        flex: 1,
        borderRadius: 10,
        marginTop: MESSAGE_BETWEEN_MARGIN,
        marginLeft: MESSAGE_BETWEEN_MARGIN
    },
    avatarBox: {
        justifyContent: 'flex-end'
    }
})

export default ChatAvatarInterpolate
