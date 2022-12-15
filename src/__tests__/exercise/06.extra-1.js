// mocking Browser APIs and modules
// http://localhost:3000/location

import {act, render, screen} from '@testing-library/react'
import React from 'react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {latitude: 28.09049, longitude: 105.43423423},
  }

  let setReturnValue
  const useMockCurrentPosition = () => {
    const [state, setState] = React.useState([])
    setReturnValue = setState
    return state
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => setReturnValue([fakePosition]))

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

test('displays the error message', async () => {
  const error = {message: 'Error getting location'}
  let setReturnValue
  const useMockCurrentPosition = () => {
    const [state, setState] = React.useState([])
    setReturnValue = setState
    return state
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => setReturnValue([null, error]))

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByRole('alert')).toHaveTextContent(error.message)
})

/*
eslint
  no-unused-vars: "off",
*/
