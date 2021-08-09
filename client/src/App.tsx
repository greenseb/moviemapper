import { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup, MapEvent } from 'react-map-gl';
import { Room } from '@material-ui/icons';
import Register from './components/register/register';
import Login from './components/login/login';
import Info from './components/info/info';
import './App.css';
// import { LngLat } from 'mapbox-gl';
import { getAllPins } from './services/ApiService';
import  { addPin } from './services/ApiService';

function App() {
  const [viewport, setViewport] = useState({
    width: '85vw',
    height: '80vh',
    latitude: 43.3781,
    longitude: -44.4360,
    zoom: 2.7
  });

  const myStorage = window.localStorage;
  const [currentPinId, setCurrentPinId] = useState(null);
  const [currentUser, setCurrentUser] = useState(myStorage.getItem('user'));
  const [location, setLocation] = useState(null);
  const [movie, setMovie] = useState(null);
  const [newPin, setNewPin] = useState(null);
  const [rating, setRating] = useState("");
  const [pins, setPins] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handlePopupClick = (id: string, lat: number, long: number) => {
    setCurrentPinId(id);
    setViewport({...viewport, latitude: lat, longitude: long})
  };

  const handlePinClick = (e: MapEvent) => {
    const [lng, lat]  = e.lngLat;
    setNewPin({
      lat,
      lng
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      username: currentUser,
      title: location,
      description: movie,
      rating,
      latitude: newPin.latitude,
      longitude: newPin.longitude,
    };
    addPin(newEntry)
  }

  const handleLogout = () => {
    myStorage.removeItem('user');
    setCurrentUser(null);
  }
 
  // async fcn inside use effect 
  // bc callback the useEffect has as the 1st argument cannot return a promise
  useEffect(() => {
    (async () => {
      const pins = await getAllPins()
      setPins(pins)
    })()
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
        {showRegister && <Register
        setShowRegister={setShowRegister}
        myStorage={myStorage}
        setCurrentUser={setCurrentUser}
        />}
        {showLogin && <Login 
        setShowLogin={setShowLogin} 
        myStorage={myStorage}
        setCurrentUser={setCurrentUser}/>}
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={(nextViewport: {
        width: string,
        height: string,
        latitude: number,
        longitude: number,
        zoom: number
      }) => setViewport(nextViewport)}
      mapStyle={process.env.REACT_APP_MAP_STYLES}
      onDblClick={handlePinClick}
    > 

    {pins.map((pin) => (
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
            <Info {...pin}/>
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
                <button className='submitButton' id="addpin-btn" type='submit'>Add Pin</button>
              </form>
            </div>
        </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
