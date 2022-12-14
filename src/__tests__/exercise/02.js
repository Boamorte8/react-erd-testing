// simple test with React Testing Library
// 🐨 import the `render` and `fireEvent` utilities from '@testing-library/react'
import {fireEvent, render} from '@testing-library/react'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
// 💣 so you can now delete this!
// global.IS_REACT_ACT_ENVIRONMENT = true

// 💣 remove this. React Testing Library does this automatically!
// beforeEach(() => {
//   document.body.innerHTML = ''
// })

test('counter increments and decrements when the buttons are clicked', () => {
  // 💣 remove these two lines, React Testing Library will create the div for you
  // const div = document.createElement('div')
  // document.body.append(div)

  // 🐨 swap createRoot and root.render with React Testing Library's render
  // Note that React Testing Library's render doesn't need you to pass a `div`
  // so you only need to pass one argument. render returns an object with a
  // bunch of utilities on it. For now, let's just grab `container` which is
  // the div that React Testing Library creates for us.
  // 💰 const {container} = render(<Counter />)
  // const root = createRoot(div)
  // act(() => root.render(<Counter />))
  const {container} = render(<Counter />)

  // 🐨 instead of `div` here you'll want to use the `container` you get back
  // from React Testing Library
  const [decrement, increment] = container.querySelectorAll('button')
  const message = container.firstChild.querySelector('div')

  expect(message).toHaveTextContent('Current count: 0')

  // 🐨 replace the next two statements with `fireEvent.click(button)`
  // 💰 note that you can remove `act` completely!
  // const incrementClickEvent = new MouseEvent('click', {
  //   bubbles: true,
  //   cancelable: true,
  //   button: 0,
  // })
  // act(() => increment.dispatchEvent(incrementClickEvent))
  fireEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  // const decrementClickEvent = new MouseEvent('click', {
  //   bubbles: true,
  //   cancelable: true,
  //   button: 0,
  // })
  // act(() => decrement.dispatchEvent(decrementClickEvent))
  fireEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
