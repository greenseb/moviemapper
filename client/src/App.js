import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room } from '@material-ui/icons';
import Register from './components/register/register';
import Login from './components/login/login';
import Info from './components/info/info';
import './App.css';

function App() {
  const [viewport, setViewport] = useState({
    width: '85vw',
    height: '80vh',
    latitude: 43.3781,
    longitude: -44.4360,
    zoom: 2.7
  });
  
  const [currentPinId, setCurrentPinId] = useState(null);
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem('user'));
  const [location, setLocation] = useState(null);
  const [movie, setMovie] = useState(null);
  const [newPin, setNewPin] = useState(null);
  const [pins, setPins] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [rating, setRating] = useState(0);

  const getAllPins = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API);
      setPins(res.data);
    } catch (e) {
      console.log(e)
    }
  }

  const handlePopupClick = (id, lat, long) => {
    setCurrentPinId(id);
    setViewport({...viewport, latitude: lat, longitude: long})
  };

  const handlePinClick = (e) => {
    const [longitude,latitude] = e.lngLat;
    setNewPin({
      latitude,
      longitude
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      username: currentUser,
      title: location,
      description: movie,
      rating,
      latitude: newPin.latitude,
      longitude: newPin.longitude,
    };
    try {
      const res = await axios.post(process.env.REACT_APP_API, newEntry);
      setPins([...pins, res.data]);
      setNewPin(null);
    } catch (e) {
      console.log(e, 'error here')
    }
  }

  const handleLogout = () => {
    myStorage.removeItem('user');
    setCurrentUser(null);
  }

  useEffect(() => {
    getAllPins()
  },[])

  return (
    <div className="App">
      <h1 className='movieMapper'>Movie Mapper<Room className='titleLogo' style={{fontSize:36.2}}></Room></h1>
      {currentUser ? (<button className='button logout' onClick={handleLogout}>Logout</button>) 
      : (<div className='buttons'>
        <button className='button login' onClick={()=>setShowLogin(true)}>Login</button>
        <div className="divider"/>
        <button className='button register' onClick={()=>setShowRegister(true)}>Register</button>
        </div>)}
        {showRegister && <Register setShowRegister={setShowRegister}/>}
        {showLogin && <Login 
        setShowLogin={setShowLogin} 
        myStorage={myStorage}
        setCurrentUser={setCurrentUser}/>}
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle={process.env.REACT_APP_MAP_STYLES}
      onDblClick={handlePinClick}
    > 

    {pins.map(pin => (
    <>
    <Marker
    latitude={pin.latitude} 
    longitude={pin.longitude} 
    offsetLeft={-viewport.zoom * 4.25} 
    offsetTop={-viewport.zoom * 8.5}
    >
    <Room style={{fontSize:viewport.zoom * 8.5,
                  color: pin.username === currentUser ? 'lightcoral' : '#8b95c9',
                  cursor: 'pointer'}}
                  onClick={() => handlePopupClick(pin._id, pin.latitude, pin.longitude)}/>
    </Marker>
    {pin._id === currentPinId && (
      <Popup
          latitude={pin.latitude}
          longitude={pin.longitude}
          closeButton={true}
          closeOnClick={false}
          anchor="bottom"
          onClose={()=>setCurrentPinId(null)}
          >
          <div className='popup'>
            <Info pin={pin}/>
          </div>
        </Popup>
    )}
        </>
        ))}
        {newPin && (
        <Popup
          latitude={newPin.latitude}
          longitude={newPin.longitude}
          closeButton={true}
          closeOnClick={false}
          anchor="bottom"
          onClose={()=>setNewPin(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Location</label>
                <input placeholder='Enter a location' onChange={(e)=>setLocation(e.target.value)}/>
                <label>Movie</label>
                <textarea placeholder='This place appeared in...' onChange={(e)=>setMovie(e.target.value)}/>
                <label>Rating</label>
                <select onChange={(e)=>setRating(e.target.value)}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
                <button className='submitButton' type='submit'>Add Pin</button>
              </form>
            </div>
        </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
