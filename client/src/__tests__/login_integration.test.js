import React from 'react';
import App from '../App';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';



// beforeEach(() => {
//   window.localStorage.removeItem('token')
//   axiosMock.__mock.reset()
//   initAPI()
// })

jest.mock('../services/ApiService', () => ({
  findUser: () => ({username: 'Alfred'}),
  getAllPins: () => ([]) // 
}));


// test login 
test('logout button should appear on screen after logging in', async () => {

  // render the app
  render(<App />)
  
  // render login
  userEvent.click(screen.getByRole('button', {name: 'Login'}))
  expect(screen.getByPlaceholderText(/username/)).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/password/)).toBeInTheDocument()
  expect(screen.queryByPlaceholderText(/email/)).not.toBeInTheDocument()
  
  // log the user in
  userEvent.click(screen.getByTestId('log-user-in'))
  await waitForElementToBeRemoved(() => screen.getByTestId('log-user-in'))
  expect(screen.getByRole('button', {name: 'Logout'})).toBeInTheDocument()
  expect(screen.queryByRole('button', {name: 'Login'})).not.toBeInTheDocument()
  expect(screen.queryByRole('button', {name: 'Register'})).not.toBeInTheDocument()
  
  // screen.debug()
})
