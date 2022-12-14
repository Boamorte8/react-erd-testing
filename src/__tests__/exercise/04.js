// form testing
// http://localhost:3000/login

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import Login from '../../components/login'

const buildLoginForm = overrides => {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(8),
    ...overrides,
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  const {username, password} = buildLoginForm()
  let submittedData
  // const handleSubmit = data => (submittedData = data)
  const handleSubmit = jest.fn()
  handleSubmit.mockImplementation(data => (submittedData = data))

  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)
  //
  // 🐨 get the username and password fields via `getByLabelText`
  // 🐨 use `await userEvent.type...` to change the username and password fields to
  //    whatever you want
  const usernameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const button = screen.getByRole('button', {name: /submit/i})

  await userEvent.type(usernameInput, username)
  await userEvent.type(passwordInput, password)

  //
  // 🐨 click on the button with the text "Submit"
  await userEvent.click(button)
  //
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
  const expected = {username, password}
  expect(submittedData).toEqual(expected)
  expect(handleSubmit).toHaveBeenCalledWith(expected)
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
