import { useState } from 'react';
import { Room } from '@material-ui/icons';
import Register from './components/register/register';
import Login from './components/login/login';
import Map from './components/map/map';
import './App.css';

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem('user'));
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    myStorage.removeItem('user');
    setCurrentUser(null);
  }

  const loginHandle = () => {
    setShowLogin(true)
    setShowRegister(false)
  }

  const registerHandle = () => {
    setShowRegister(true)
    setShowLogin(false)
  }

  return (
    <div className="App">
      <h1 className='movieMapper'>Movie Mapper<Room className='titleLogo' style={{fontSize:36.2}}></Room></h1>
      {currentUser ? (<button className='button logout' onClick={handleLogout}>Logout</button>) 
      : (<div className='buttons'>
        <button className='button login' onClick={loginHandle}>Login</button>
        <div className="divider"/>
        <button className='button register' onClick={registerHandle}>Register</button>
        </div>)}
        {showRegister && <Register setShowRegister={setShowRegister} setShowLogin={setShowLogin}/>}
        {showLogin && <Login 
        setShowLogin={setShowLogin} 
        myStorage={myStorage}
        setCurrentUser={setCurrentUser}/>}
        <Map currentUser={currentUser}/>
    </div>
  );
}

export default App;
