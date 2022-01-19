import React, {useLayoutEffect, useRef, useState} from 'react'
import {Animated, Dimensions, StyleSheet, Text, View, ViewToken} from 'react-native'
import * as faker from 'faker'
import {useNavigation} from '@react-navigation/native'
import useAnimatedLatestValueRef from '../hook/useAnimatedLatestValueRef'
import {map, random} from 'lodash'

type MessageType = { username: string, text: string, avatar: string }
const messages: MessageType[] = new Array(30).fill(1).map((_, i) => {
    return {
        avatar: faker.random.image(),
        text: faker.lorem.words(random(5, 100)),
        username: faker.name.firstName() + ' ' + faker.name.lastName()
    }
})

const AVATAR_ICON_SIZE = 35
const MESSAGE_BETWEEN_MARGIN = 8
const BOTTOM_FOOTER_H = 100
const LIST_BOTTOM_PADDING = 15

const ChatAvatarInterpolate = () => {
    const scrollY = useRef(new Animated.Value(0)).current

    const viewableProps = useViewableListCallback()

    return (
        <View style={styles.container}>
            <Animated.FlatList<MessageType>
                {...viewableProps}
                removeClippedSubviews={false}
                contentContainerStyle={{paddingHorizontal: MESSAGE_BETWEEN_MARGIN, paddingTop: LIST_BOTTOM_PADDING}}
                initialNumToRender={messages.length}
                keyExtractor={(item, index) => String(index)}
                data={messages}
                inverted
                renderItem={({item, index}) => {
                    return <MessageBlock {...item} scrollAnimateValue={scrollY}/>
                }}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}
            />
            <View style={styles.footerBox}/>
        </View>
    )
}

const useViewableListCallback = () => {
    const onViewableItemsChanged = useRef((info: { viewableItems: ViewToken[], changed: ViewToken[] }) => {
        const visibleItemsNames = map(info?.viewableItems, 'item.username')
        // console.log({visibleItemsNames})
        //TODO USING for make read to server side event (for id)
        // console.log('Visible items are', currentItem)
    }).current

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current

    return {onViewableItemsChanged, viewabilityConfig}
}

const MessageBlock = (props: MessageType & { scrollAnimateValue: Animated.Value }) => {
    const {
        avatar,
        username,
        text,
        scrollAnimateValue
    } = props
    const messageBoxRef = useRef<View>(null)

    const {animateStyleAvatar} = useAnimateMessageAvatar(messageBoxRef, scrollAnimateValue)

    if (!text || !username) return null

    return <View
        ref={messageBoxRef}
        renderToHardwareTextureAndroid={true}
        collapsable={false}
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

const useAnimateMessageAvatar = (boxRef: React.RefObject<View>, scrollAnimateValue: Animated.Value) => {
    const navigation = useNavigation()
    const windowH = Dimensions.get('window').height

    const [interPosition, setInterPositions] = useState({
        startBottomPosition: 0,
        endTopPosition: 0
    })

    //hot reload fix to except crash after hot update
    const [animValRef] = useAnimatedLatestValueRef(scrollAnimateValue, 0)

    const setUpMeasure = () => {
        if (!navigation.isFocused()) return
        boxRef?.current?.measure((x, y, w, h, pX, pY) => {
            const scrollPosition = animValRef.current
            //Top avatar screen position depends on pY scroll and h (to first item should be 0) //TODO here can be added additional variable like "bottomInsert" to move all items upper
            const startBottomPosition = Math.round((windowH - (pY + h) - (BOTTOM_FOOTER_H + LIST_BOTTOM_PADDING)) + scrollPosition)
            const endTopPosition = Math.round((startBottomPosition + h) - (AVATAR_ICON_SIZE))
            setInterPositions({endTopPosition, startBottomPosition})
            // console.log({pY, startBottomPosition, endTopPosition, h, heightScreen: SIZE.height, bottomInsert})
        })
    }

    useLayoutEffect(() => {
        //crutch to elements with do not rendered on over list positions (if nav event did not react)
        setTimeout(() => {
            setUpMeasure()
        }, 1000)
        //@ts-ignore //to skip navigation animation and use measure method just after to exclude lie result
        return navigation.addListener('transitionEnd', (e) => {
            setUpMeasure()
        })
    }, [])

    const {startBottomPosition, endTopPosition} = interPosition
    const itemHeight = endTopPosition - startBottomPosition
    const animateStyleAvatar = {
        transform: [{
            translateY: scrollAnimateValue.interpolate({
                inputRange: [-1, 0, startBottomPosition, endTopPosition, endTopPosition + 1],
                outputRange: [0, 0, 0, -itemHeight, -itemHeight],
            })
        }]
    }

    return {animateStyleAvatar}
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0e1527',
    },
    messageBlock: {
        flexDirection: 'row',
    },
    avatar: {
        width: AVATAR_ICON_SIZE,
        height: AVATAR_ICON_SIZE,
        borderRadius: AVATAR_ICON_SIZE / 2,
        backgroundColor: 'gray'
    },
    textBox: {
        padding: 10,
        backgroundColor: 'rgba(12,77,119,0.73)',
        flex: 1,
        borderRadius: 10,
        marginLeft: MESSAGE_BETWEEN_MARGIN,
        marginTop: MESSAGE_BETWEEN_MARGIN,//can move to messageBlock to exclude icon near touching
    },
    avatarBox: {
        justifyContent: 'flex-end'
    },
    footerBox: {
        backgroundColor: '#222f36',
        height: BOTTOM_FOOTER_H,
        width: '100%',
    }
})

export default ChatAvatarInterpolate
