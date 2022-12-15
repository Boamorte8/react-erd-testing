// testing custom hooks
// http://localhost:3000/counter-hook

import {act, renderHook} from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions with rtl', () => {
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 5}})
  expect(result.current.count).toBe(5)
  act(() => result.current.increment())
  expect(result.current.count).toBe(6)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(5)
})

test('allows customization of the step', () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 5}})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(5)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

/* eslint no-unused-vars:0 */
