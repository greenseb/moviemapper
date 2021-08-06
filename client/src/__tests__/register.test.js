import React from 'react'
import ReactDOM from 'react-dom'
import Register from '../components/register/register';
import {render, waitFor, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'
import { ExpansionPanelActions } from '@material-ui/core'


// jest.mock('../components/register/register', () => {
//   handleSubmit: () => ({
//     username: "Alfred",
//     email: "alfred@aceoptions.com",
//     password: "alfred"
//   })
// })

test('it registers the users with the correct credentials on button click', async () => {

  const handleSubmit = jest.fn();
  const setShowRegister = jest.fn();

  render(<Register setShowRegister={setShowRegister}/>);

  const usernameInput = screen.getByPlaceholderText(/username/);
  const emailInput = screen.getByPlaceholderText(/email/);
  const passwordInput = screen.getByPlaceholderText(/password/);
  const submitBtn = screen.getByRole('button', {name: /Register/i});

  // populate
  userEvent.type(usernameInput, 'tester');
  userEvent.type(emailInput, 'tester@test.com');
  userEvent.type(passwordInput, 'testerpassword');
  
  // submit form
  await userEvent.click(submitBtn);

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  // screen.getByText (success message)
  // screen.getByText (error message)


})