import * as React from 'react'
import {useState} from 'react'
import {ActivityIndicator, Animated, Keyboard, StyleSheet, TextInput, TouchableOpacity, View,} from 'react-native'
import useAnimateShowScale from '../hooks/useAnimateShowScale'
import {impactAsync, ImpactFeedbackStyle,} from 'expo-haptics'
import SIZE from '../../../src/config/SIZE'
import {AntDesign, FontAwesome} from '@expo/vector-icons'

const MIN_HEIGHT = 45
const iconColor = '#4649ad'
const brandColor = 'orange'

type SearchInputProps = {
    multiline?: boolean
    // autoFocus?: boolean;
    onSubmit?: (value?: string) => void;
    showSendBtn?: boolean
    onInput?: (value: string) => void
}

const SearchTextInput = (
    props: SearchInputProps,
) => {
    const {
        // autoFocus = false,
        onSubmit,
        multiline = false,
        showSendBtn = false,
        onInput
    } = props

    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)

    const isExistText = !!value?.replace(/\n/g, '').trim()
    const {animateStyle} = useAnimateShowScale(isExistText)

    const onPressSendComment = () => {
        if (!isExistText) {
            return
        }
        impactAsync(ImpactFeedbackStyle.Light)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            if (onSubmit)
                onSubmit(value)
            setValue('')
        }, 1000)
        //after success send query
        Keyboard.dismiss()
    }

    return (
        <View style={styles.container}>
            {/*COMMENT ICON LEFT*/}
            <FontAwesome name="search" size={MIN_HEIGHT / 2} color={iconColor}/>
            {/*TEXT INPUT CENTER*/}
            <TextInput
                value={value}
                accessible
                multiline={multiline}
                editable={!loading}
                onChangeText={(text) => {
                    setValue(text)
                    if (onInput)
                        onInput(text)
                }}
                placeholder={('Оставить комментарий')}
                style={styles.textInput}
                placeholderTextColor={'gray'}
                maxLength={1000}
                returnKeyType={showSendBtn ? 'next' : 'search'}
                // autoFocus={autoFocus}
                onSubmitEditing={showSendBtn ? () => {
                } : onPressSendComment}
            />
            {/*SEND BUTTON RIGHT*/}
            {showSendBtn &&
            <Animated.View style={[animateStyle, styles.sendButtonBox]}>
                <TouchableOpacity
                    disabled={loading}
                    onPress={onPressSendComment}
                    style={styles.sendButtonTouchBox}>
                    {!loading && (
                        <AntDesign name={'arrowup'} size={24} color={iconColor}/>
                    )}
                    {loading && <ActivityIndicator color={iconColor} size={'small'}/>}
                </TouchableOpacity>
            </Animated.View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: MIN_HEIGHT,
        maxHeight: SIZE.height / 4,
        borderRadius: MIN_HEIGHT / 2,
        // backgroundColor: theme.isDark ? theme.brandLight : theme.brandSemiLight,
        backgroundColor: '#bcbcbc',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: MIN_HEIGHT / 3,
        paddingRight: MIN_HEIGHT,
    },
    textInput: {
        minHeight: MIN_HEIGHT / 1.5,
        flex: 1,
        marginLeft: 10,
        // color: theme.textColor,
        // fontSize: theme.DefaultFontSize,
        // fontFamily: theme.fontFamily,
    },
    sendButtonBox: {
        width: MIN_HEIGHT * 0.8,
        height: MIN_HEIGHT * 0.8,
        position: 'absolute',
        right: 5,
        bottom: 5,
    },
    sendButtonTouchBox: {
        flex: 1,
        borderRadius: MIN_HEIGHT / 2,
        backgroundColor: brandColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    upIcon: {
        fontSize: MIN_HEIGHT * 0.6,
        color: iconColor,
    },
})

export default SearchTextInput
