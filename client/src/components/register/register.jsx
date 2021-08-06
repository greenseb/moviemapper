import './register.css'
import { Room, Close } from '@material-ui/icons'
import { useRef, useState } from 'react';
import axios from 'axios';
import {addUser} from '../../services/ApiService';

export default function Register({setShowRegister}) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value
    };
    try {
      addUser(newUser)
      setError(false);
      setSuccess(true);
    } catch (e) {
      console.log(e)
      setError(true);
      setSuccess(false);
    }
  }

  return (
    <div className='registerContainer'>
      <div className='logo'>
        Movie Mapper
        <Room />
      </div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='username' ref={nameRef}/>
        <input type='email' placeholder='email' ref={emailRef}/>
        <input type='password' placeholder='password' ref={passRef}/>
        <button className='registerButton'>Register</button>
        {success &&
        <span className='success'>User successfully created, you may log in!</span>
      }
        {error &&
        <span className='failure'>Something went wrong!</span>
        }
      </form>
      <Close className='registerClose' onClick={()=>setShowRegister(false)}/>
    </div>
  )
}