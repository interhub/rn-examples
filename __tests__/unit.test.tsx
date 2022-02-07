import React from 'react'
import {cleanup} from '@testing-library/react-native'

beforeEach(() => {
  cleanup()
})

/**
 * unit tests
 */
describe('test unit', () => {
  test('check', async () => {
    const sum = (a: number, b: number) => a + b
    expect(sum(1, 2)).toBe(3)
  })
})
