import React from 'react';
import App from '../App';
import {render, screen, waitForElementToBeRemoved} from '@testing-library/React';
import userEvent from '@testing-library/user-event';
import { expect, jest } from '@jest/globals';
import '@testing-library/jest-dom';

jest.mock('../services/ApiService.js', () => ({
  addUser: () => ({username: 'Frank'}),
  getAllPins: () => ([])
}));

// test register
test('logout butto should appear on screen after registering', async () => {

  // render the app
  render(<App />)

  // render register
  userEvent.click(screen.getByRole('button', {name: 'Register'}))
  expect(screen.getByPlaceholderText(/username/)).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/email/)).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/password/)).toBeInTheDocument()

  // log the user in after registering
  userEvent.click(screen.getByTestId('register-user'))
  await waitForElementToBeRemoved(() => screen.getByTestId('register-user'))
  expect(screen.getByRole('button', {name: 'Logout'})).toBeInTheDocument()
  expect(screen.queryByRole('button', {name: 'Login'})).not.toBeInTheDocument()
  expect(screen.queryByRole('button', {name: 'Register'})).not.toBeInTheDocument()

  // screen.debug()
})
