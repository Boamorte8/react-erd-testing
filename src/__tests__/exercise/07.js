// testing with context and a custom render method
// http://localhost:3000/easy-button

// import * as React from 'react'
import {render as rtlRender, screen} from 'test/test-utils'
import EasyButton from '../../components/easy-button'
import {ThemeProvider} from '../../components/theme'

function render(ui, {theme = 'light', ...options} = {}) {
  function Wrapper({children}) {
    return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  }
  return rtlRender(ui, {wrapper: Wrapper, ...options})
}

test('renders with the light styles for the light theme', () => {
  render(<EasyButton>Easy</EasyButton>)
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
  // 🐨 update the `render` call above to use the wrapper option using the
  // ThemeProvider
})

test('renders with the dark styles for the dark theme', () => {
  render(<EasyButton>Easy</EasyButton>, {theme: 'dark'})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})

/* eslint no-unused-vars:0 */
