// simple test with ReactDOM
// http://localhost:3000/counter

import {createRoot} from 'react-dom/client'
import {act} from 'react-test-renderer'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const container = document.createElement('div')
  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.appendChild(container)
  //
  // 🐨 use createRoot to render the <Counter /> to the div
  act(() => {
    createRoot(container).render(<Counter />)
  })
  // 🐨 get a reference to the increment and decrement buttons:
  //   💰 div.querySelectorAll('button')
  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')
  const [decrement, increment] = container.querySelectorAll('button')
  const message = container.firstChild.querySelector('div')

  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  //
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  expect(message.textContent).toBe('Current count: 0')
  // 🐨 click the increment button (💰 act(() => increment.click()))
  act(() => increment.dispatchEvent(event))

  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 1')
  // 🐨 click the decrement button (💰 act(() => decrement.click()))
  act(() => decrement.dispatchEvent(event))
  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 0')
  //
  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
  // container.remove()
})

/* eslint no-unused-vars:0 */
