// testing custom hooks
// http://localhost:3000/counter-hook

import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
const Counter = ({params}) => {
  const {count, increment, decrement} = useCounter(params)
  return (
    <div>
      <span>Counter: {count}</span>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  render(<Counter />)

  const message = screen.getByText(/counter/i)
  const decrement = screen.getByText('Decrement')
  const increment = screen.getByRole('button', {name: /increment/i})

  expect(message).toHaveTextContent('Counter: 0')
  await userEvent.click(increment)
  expect(message).toHaveTextContent('Counter: 1')
  await userEvent.click(decrement)
  expect(message).toHaveTextContent('Counter: 0')

  // 🐨 render the component
  // 🐨 get the elements you need using screen
  // 🐨 assert on the initial state of the hook
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
})

test('exposes the count and increment/decrement functions without implement a complete component', () => {
  let results = {}
  function TestComponent(props) {
    results = useCounter(props)
    return null
  }
  render(<TestComponent />)
  expect(results.count).toBe(0)
  act(() => results.increment())
  expect(results.count).toBe(1)
  act(() => results.decrement())
  expect(results.count).toBe(0)
})

test('allows customization of the initial count', async () => {
  render(<Counter params={{initialCount: 5}} />)

  const message = screen.getByText(/counter/i)
  const decrement = screen.getByText('Decrement')
  const increment = screen.getByRole('button', {name: /increment/i})

  expect(message).toHaveTextContent('Counter: 5')
  await userEvent.click(increment)
  expect(message).toHaveTextContent('Counter: 6')
  await userEvent.click(decrement)
  expect(message).toHaveTextContent('Counter: 5')
})

test('allows customization of the step', async () => {
  render(<Counter params={{step: 5}} />)

  const message = screen.getByText(/counter/i)
  const decrement = screen.getByText('Decrement')
  const increment = screen.getByRole('button', {name: /increment/i})

  expect(message).toHaveTextContent('Counter: 0')
  await userEvent.click(increment)
  expect(message).toHaveTextContent('Counter: 5')
  await userEvent.click(decrement)
  expect(message).toHaveTextContent('Counter: 0')
})

function setup({initialProps = {initialCount: 0}} = {}) {
  const results = {}
  function TestComponent() {
    results.current = useCounter(initialProps)
    return null
  }
  render(<TestComponent />)
  return results
}

test('exposes the count and increment/decrement functions with a setup function', () => {
  const results = setup()
  expect(results.current.count).toBe(0)
  act(() => results.current.increment())
  expect(results.current.count).toBe(1)
  act(() => results.current.decrement())
  expect(results.current.count).toBe(0)
})

/* eslint no-unused-vars:0 */
