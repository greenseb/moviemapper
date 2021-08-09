import './login.css'
import { Room, Close } from '@material-ui/icons'
import { useRef, useState } from 'react';
import {findUser} from '../../services/ApiService';

export default function Login({setShowLogin, myStorage, setCurrentUser}) {
  const [error, setError] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passRef.current.value
    };
    try {
      const res = await findUser(user);
      myStorage.setItem('user', res.username);
      setCurrentUser(res.username);
      setShowLogin(false);
    } catch (e) {
      setError(true);
    }
  }

  return (
    <div className='loginContainer'>
      <div className='logo'>
        Movie Mapper
        <Room />
      </div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='username' ref={nameRef}/>
        <input type='password' placeholder='password' ref={passRef}/>
        <button className='loginButton' id="login-btn" data-testid="log-user-in">Login</button>
        {error &&
        <span className='failure'>Something went wrong!</span>
        }
      </form>
      <Close className='loginClose' onClick={()=>setShowLogin(false)}/>
    </div>
  )
}