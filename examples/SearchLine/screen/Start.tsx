import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import SearchTextInput from '../components/SearchTextInput'
import * as faker from 'faker'
import TextLine from '../../../components/TextLine'
import useDebounceState from '../hooks/useDebounceState'
import {filter} from 'lodash'

const MUSICS = new Array(200).fill(1).map(() => faker.music.genre())

export default function () {
    const [listMusics, setListMusics] = useState<string[]>(MUSICS)

    const [value, setValue] = useDebounceState('', 300)
    useEffect(() => {
        const filteredMusics = filter(MUSICS, (name) => name.toLowerCase().includes(value.toLowerCase()))
        setListMusics(filteredMusics)
    }, [value])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SearchTextInput showSendBtn onInput={setValue}/>
            </View>
            <FlatList
                keyboardDismissMode={'on-drag'}
                initialNumToRender={35}
                data={listMusics}
                keyExtractor={(item, index) => String(index)}
                renderItem={({item: genre, index}) => {
                    return <View>
                        <TextLine>
                            {index + 1}. {genre}
                        </TextLine>
                    </View>
                }}
                contentContainerStyle={{paddingBottom: 50}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#d8d8d8'
    },
    title: {
        textAlign: 'center',
        marginTop: 'auto',
        color: '#FFF',
        fontSize: 20,
    },
})
