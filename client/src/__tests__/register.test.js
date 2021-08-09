import React from 'react'
import ReactDOM from 'react-dom'
import Register from '../components/register/register';
import {render, waitFor, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'

jest.mock('../services/ApiService', () => ({
  addUser: () => ({
    username: "Alfred"
  })
}));

test('it registers the users with the correct credentials on button click', async () => {

  const setShowRegister = jest.fn();
  const myStorage = {setItem: jest.fn()};
  const setCurrentUser = jest.fn();
  const credentials = {username: "Alfred"}

  render(<Register 
    setShowRegister={setShowRegister}
    myStorage={myStorage}
    setCurrentUser={setCurrentUser}
    />);

  const usernameInput = screen.getByPlaceholderText(/username/);
  const emailInput = screen.getByPlaceholderText(/email/);
  const passwordInput = screen.getByPlaceholderText(/password/);
  const submitBtn = screen.getByRole('button', {name: /Register/i});

  // populate
  userEvent.type(usernameInput, 'Alfred');
  userEvent.type(emailInput, 'alfred@test.com');
  userEvent.type(passwordInput, 'testerpassword');
  
  // submit form
  await userEvent.click(submitBtn);

  expect(myStorage.setItem).toHaveBeenCalledWith("user", credentials.username);
  expect(setCurrentUser).toHaveBeenCalledWith(credentials.username); 

})