import React, {useState} from 'react'
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

const TesterModuleComponent = () => {
    const [count, setCount] = useState(0)
    const increment = async () => {
        // await new Promise((ok) => setTimeout(ok, 300))
        setCount(count + 1)
    }
    const decrement = () => {
        setCount(count - 1)
    }
    return (
        <View style={styles.container}>
            <Text>{String(count)}</Text>
            <Button title={'increment'} testID={'inc'} onPress={increment}/>
            <TouchableOpacity onPress={decrement}>
                <Text>decrement</Text>
            </TouchableOpacity>
            <CustomDisplay value={count}/>
        </View>
    )
}

const CustomDisplay = ({value}: { value: number }) => {
    return <View>
        <Text>value is {value}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default TesterModuleComponent
