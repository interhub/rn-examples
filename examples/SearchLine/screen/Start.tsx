import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import SearchTextInput from '../components/SearchTextInput'
import * as faker from 'faker'
import TextLine from '../../../components/TextLine'
import useDebounceState from '../hooks/useDebounceState'
import {filter} from 'lodash'
import layoutAnimation from '../../../src/config/layoutAnimation'

type MusicItemType = {
    name: string
    id: string
}
const MUSICS:MusicItemType[] = new Array(200).fill(1).map((_, key) => ({name: faker.music.genre(), id: String(key)}))

export default function () {
    const [listMusics, setListMusics] = useState<MusicItemType[]>(MUSICS)

    const [value, setValue] = useDebounceState('', 300)

    //filter hook
    useEffect(() => {
        const filteredMusics = filter(MUSICS, ({name}) => name.toLowerCase().includes(value.toLowerCase()))
        setListMusics(filteredMusics)
    }, [value])

    //layout animation hook
    useEffect(() => {
        return ()=>{
            layoutAnimation()
        }
    }, [value])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SearchTextInput showSendBtn onInput={setValue}/>
            </View>
            <FlatList<MusicItemType>
                keyboardDismissMode={'on-drag'}
                initialNumToRender={35}
                data={listMusics}
                keyExtractor={(item:MusicItemType) => String(item.id)}
                renderItem={({item: {name}, index}) => {
                    return <View>
                        <TextLine>
                            {index + 1}. {name}
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
