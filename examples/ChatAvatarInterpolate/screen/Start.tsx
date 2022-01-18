import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {Animated, Dimensions, FlatList, StyleSheet, Text, View, VirtualizedList} from 'react-native'
import * as faker from 'faker'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {useHeaderHeight} from '@react-navigation/stack'
import SIZE from '../../../src/config/SIZE'

type MessageType = { username: string, text: string, avatar: string }
const messages: MessageType[] = new Array(30).fill(1).map((_, i) => {
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

    return (
        <View style={styles.container}>
            <Animated.FlatList<MessageType>
                // ref={listRef}
                // onScrollToIndexFailed={onScrollToIndexFailed}
                contentContainerStyle={{paddingTop: bottomInsert}}
                initialNumToRender={messages.length}
                // getItemLayout={(item, index) => {
                //     const H = 280
                //     return {index, length: H, offset: index * H}
                // }}
                keyExtractor={(item, index) => String(index)}
                data={messages}
                inverted
                renderItem={({item, index}) => {
                    return <MessageBlock {...item} scrollAnimateValue={scrollY}/>
                }}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}
            />
        </View>
    )
}

const MessageBlock = (props: MessageType & { scrollAnimateValue: Animated.Value }) => {
    const {
        avatar,
        username,
        text,
        scrollAnimateValue
    } = props
    const messageBoxRef = useRef<View>(null)
    const navigation = useNavigation()
    const {bottom: bottomInsert} = useSafeAreaInsets()

    const [interPosition, setInterPositions] = useState({
        startBottomPosition: 1,
        endTopPosition: 2
    })

    const [isEndAnim, setIsEndAnim] = useState(false)
    useEffect(() => {
        if (!isEndAnim) return
        if (!navigation.isFocused()) return
        return messageBoxRef?.current?.measure((x, y, w, h, pX, pY) => {
            //Top avatar screen position depends on pY scroll and h (to first item should be 0)
            const startBottomPosition = Math.round(SIZE.height - (pY + h) - bottomInsert) // pY - (SIZE.height - headerHeight)
            const endTopPosition = Math.round((startBottomPosition + h) - (AVATAR_ICON_SIZE)) // pY - (SIZE.height - headerHeight)
            setInterPositions({endTopPosition, startBottomPosition})
            console.log({pY, startBottomPosition, endTopPosition, h, username, heightScreen: SIZE.height, bottomInsert})
        })
    }, [isEndAnim])

    useLayoutEffect(() => {
        //crutch to elements with do not rendered on over list positions (if nav event did not react)
        setTimeout(() => {
            setIsEndAnim(true)
        }, 1000)
        //@ts-ignore //to skip navigation animation and use measure method just after to exclude lie result
        return navigation.addListener('transitionEnd', (e) => {
            setIsEndAnim(true)
        })
    }, [])

    const {startBottomPosition, endTopPosition} = interPosition
    const itemHeight = endTopPosition - startBottomPosition
    const animateStyleAvatar = {
        transform: [{
            translateY: scrollAnimateValue.interpolate({
                // zero | startMovePosition | startMovePosition+1 | endTopPosition | endTopPosition+1 //
                inputRange: [-1, 0, startBottomPosition, endTopPosition],//startBottomPosition, startBottomPosition + 1, endTopPosition, endTopPosition + 1],// endTopPosition, endTopPosition + 1],
                outputRange: [-1, 0, 0, -itemHeight,],//startBottomPosition, -startBottomPosition - 1, -endTopPosition, endTopPosition + 1],// -endTopPosition, -endTopPosition - 1],
                extrapolate: 'clamp'
            })
        }]
    }

    if (!text || !username) return null

    return <View
        ref={messageBoxRef}
        style={styles.messageBlock}>
        <View style={styles.avatarBox}>
            <Animated.Image style={[styles.avatar, animateStyleAvatar]} source={{uri: avatar}}/>
        </View>
        <View style={styles.textBox}>
            <Text selectable style={{color: '#fff', fontWeight: 'bold', paddingBottom: 5}}>{username}</Text>
            <Text selectable style={{color: '#fff'}}>{text}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111a32',
        paddingHorizontal: MESSAGE_BETWEEN_MARGIN,
        // transform:[{rotateX : 2*Math.PI}]
    },
    messageBlock: {
        flexDirection: 'row',
    },
    avatar: {
        width: AVATAR_ICON_SIZE,
        height: AVATAR_ICON_SIZE,
        borderRadius: AVATAR_ICON_SIZE / 2,
        backgroundColor:'gray'
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