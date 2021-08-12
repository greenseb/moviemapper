import React from 'react';
import Login from '../components/login/login';
import {render, waitFor, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { findUser } from '../services/ApiService';

jest.mock('../services/ApiService', () => ({
  findUser: () => ({username: 'Alfred'})
}));

test.only('should call findUser with the correct credentials', async () => {

  const setShowLogin = jest.fn();
  const setCurrentUser = jest.fn();
  const myStorage = {setItem: jest.fn()};
  const credentials = {username: 'Alfred'}

  
  render(<Login 
    setShowLogin={setShowLogin}
    setCurrentUser={setCurrentUser}
    myStorage={myStorage}
  />);

  const usernameInput = screen.getByPlaceholderText(/username/);
  const passwordInput = screen.getByPlaceholderText(/password/);
  const submitBtn = screen.getByRole('button', {name: /Login/i});
    
  userEvent.type(usernameInput, 'Alfred');
  userEvent.type(passwordInput, 'testerpassword');

  await userEvent.click(submitBtn);

  expect(myStorage.setItem).toHaveBeenCalledWith("user", credentials.username);
  expect(setCurrentUser).toHaveBeenCalledWith(credentials.username);


}) 

