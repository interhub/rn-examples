import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import SearchTextInput from '../components/SearchTextInput'
import * as faker from 'faker'
import TextLine from '../../../components/TextLine'
import {filter} from 'lodash'
import layoutAnimation from '../../../src/config/layoutAnimation'
import useNotFirstEffect from '../../../src/hooks/useNotFirstEffect'
import useDebounceState from '../../../src/hooks/useDebounceState'
import DividerCustom from '../../../components/DividerCustom'
import {Foundation} from '@expo/vector-icons'

type MusicItemType = {
    name: string
    id: string
}
const MUSICS: MusicItemType[] = new Array(200).fill(1).map((_, key) => ({name: faker.music.genre(), id: String(key)}))

export default function () {
    const [listMusics, setListMusics] = useState<MusicItemType[]>(MUSICS)

    const [value, setValue] = useDebounceState('', 300)

    //filter hook
    useEffect(() => {
        const filteredMusics = filter(MUSICS, ({name}) => name.toLowerCase().includes(value.toLowerCase()))
        setListMusics(filteredMusics)
    }, [value])

    //layout animation hook
    useNotFirstEffect(() => {
        layoutAnimation.listMove()
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
                keyExtractor={(item: MusicItemType) => String(item.id)}
                renderItem={({item: {name, id}, index}) => {
                    return                      <View style={styles.itemBox}>
                            <TextLine>
                                {id}. {name}
                            </TextLine>
                            <Foundation name="music" size={24} color="black"/>
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
    itemBox: {
        flexDirection: 'row', justifyContent: 'space-between',
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d8d8d8'
    }

})
