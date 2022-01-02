import React from 'react'
import {cleanup, render, fireEvent, waitFor} from '@testing-library/react-native'
import TextLine from '../components/TextLine'
import TesterModuleComponent from '../TesterModuleComponent'

beforeEach(() => {
    cleanup()
})

/**
 * example testing of once component
 */
test('example testing of once component', () => {
    const mockFn = jest.fn()
    //returning find helper func
    const {getByText, debug} = render(
        <TextLine size={30} selectable onPress={mockFn}>Hello world</TextLine>
    )
    const testText = 'Hello world'
    //find concrete component
    const TextComponent = getByText(testText)
    //press event
    fireEvent.press(TextComponent)
    //log three
    // debug('debug TextComponent')

    expect(TextComponent).toBeTruthy()
    expect(TextComponent.props.selectable).toBeTruthy()
    expect(TextComponent.props.onPress).toBeTruthy()
    expect(TextComponent.props.children).toBe(testText)
    expect(mockFn).toBeCalled()
})

/**
 * example integration testing of multiple components module
 */
describe('example integration testing of multiple components module', () => {
    /**
     * press founded component count times for testing
     */
    const pressCountTimes = (el: any, times: number) => {
        for (let i = 0; i < times; i++) {
            fireEvent.press(el)
        }
    }

    test('exist checking and props handler func exist checking', () => {
        const {getByText, getByTestId} = render(
            <TesterModuleComponent/>
        )
        // debug('TesterModuleComponent')
        //find concrete component
        const DisplayCountComponent = getByText('0')
        const IncBtnComponent = getByTestId('inc')
        const DecBtnComponent = getByText('decrement')

        //exist checking
        expect(DisplayCountComponent).toBeTruthy()
        expect(DecBtnComponent).toBeTruthy()
        expect(IncBtnComponent).toBeTruthy()
    })

    test('dom update result checking', () => {
        const {getByText, getByTestId, debug} = render(
            <TesterModuleComponent/>
        )

        // debug('TesterModuleComponent')

        //find concrete component
        const DisplayCountComponent = getByText('0')
        const IncBtnComponent = getByTestId('inc')
        const DecBtnComponent = getByText('decrement')

        //call inc event 3 times
        pressCountTimes(IncBtnComponent, 3)

        //dom update result checking
        expect(DisplayCountComponent.props.children).toBe('3')

        //call dec event 5 times
        pressCountTimes(DecBtnComponent, 5)

        //dom update result checking
        expect(DisplayCountComponent.props.children).toBe('-2')
    })

    test('custom other component checking', async () => {
        const {getByText, getByTestId, UNSAFE_getByProps} = render(
            <TesterModuleComponent/>
        )
        const IncBtnComponent = getByTestId('inc')
        const CustomComponent = UNSAFE_getByProps({value: 0})
        const CustomDisplay = getByText('value is 0')

        //set new state
        pressCountTimes(IncBtnComponent, 3)

        //check the element appear with await (3 possible ways to pass test)
        await waitFor(() => getByText('value is 3'))
        expect(CustomComponent.props.value).toBe(3)
        expect(CustomDisplay.props.children.join('')).toBe('value is 3')
    })

})
