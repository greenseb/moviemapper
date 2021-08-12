import { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup, MapEvent } from 'react-map-gl';
import { Room } from '@material-ui/icons';
import Register from './components/register/register';
import Login from './components/login/login';
import Info from './components/info/info';
import './App.css';
import { getAllPins } from './services/ApiService';
import { addPin } from './services/ApiService';
import { pin } from './interfaces'

function App() {
  const [viewport, setViewport] = useState({
    width: '85vw',
    height: '80vh',
    latitude: 43.3781,
    longitude: -44.4360,
    zoom: 2.7
  });

  const myStorage = window.localStorage;
  const [currentPinId, setCurrentPinId] = useState("");
  const [currentUser, setCurrentUser] = useState<string | null>(myStorage.getItem('user'));
  const [location, setLocation] = useState("");
  const [movie, setMovie] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  
  const [newPin, setNewPin] = useState<pin>({
    username: "",
    title: "",
    description: "",
    rating: "",
    latitude: 0,
    longitude: 0,
  });

  const [pins, setPins] = useState<pin[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handlePopupClick = (id: string, lat: number, long: number) => {
    setCurrentPinId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long })
  };

  const handlePinClick = (e: MapEvent) => {
    setShowPopup(true)
    const [lng, lat] = e.lngLat;
    setNewPin({
      ...newPin,
      latitude: lat,
      longitude: lng
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      username: currentUser ? currentUser : "",
      title: location,
      description: movie,
      rating: rating,
      latitude: newPin.latitude,
      longitude: newPin.longitude,
      image: image,
      video: video
    };
    await addPin(newEntry)
    setPins((prev: pin[]) => [...prev, newEntry])
    setShowPopup(false)
  }

  const handleLogout = () => {
    myStorage.removeItem('user');
    setCurrentUser("");
    setCurrentPinId("");
    setViewport({
      width: '85vw',
      height: '80vh',
      latitude: 43.3781,
      longitude: -44.4360,
      zoom: 2.7
    });
  }

  useEffect(() => {
    (async () => {
      const pins = await getAllPins()
      setPins(pins)
    })()
  }, [])

  return (
    <div className="App">

      <h1 className='movieMapper'>Movie Mapper<Room className='titleLogo' style={{ fontSize: 36.2 }}></Room></h1>
      {currentUser ? (<button className='button logout' onClick={handleLogout}>Logout</button>)
        : (<div className='buttons'>
          <button className='button login' onClick={() => {setShowLogin(true); setShowRegister(false)}}>Login</button>
          <div className="divider" />
          <button className='button register' onClick={() => {setShowRegister(true); setShowLogin(false)}}>Register</button>
        </div>)}
      {showRegister && <Register
        setShowRegister={setShowRegister}
        myStorage={myStorage}
        setCurrentUser={setCurrentUser}
      />}
      {showLogin && <Login
        setShowLogin={setShowLogin}
        myStorage={myStorage}
        setCurrentUser={setCurrentUser} />}
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

        {pins && pins.map((pin) => (
          <>
            <Marker
              latitude={pin.latitude}
              longitude={pin.longitude}
              offsetLeft={-viewport.zoom * 4.25}
              offsetTop={-viewport.zoom * 8.5}
            >
              <Room style={{
                fontSize: viewport.zoom * 8.5,
                color: pin.username === currentUser ? 'lightcoral' : '#8b95c9',
                cursor: 'pointer'
              }}
                onClick={() => handlePopupClick(pin._id!, pin.latitude, pin.longitude)} />
            </Marker>
            {pin._id === currentPinId && (
              <Popup
                latitude={pin.latitude}
                longitude={pin.longitude}
                closeButton={true}
                closeOnClick={false}
                anchor="bottom"
                onClose={() => setCurrentPinId("")}
              >
                <div className='popup'>
                  <Info pin={pin} pins={pins} setPins={setPins} />
                </div>
              </Popup>
            )}
          </>
        ))}
        {showPopup && (
          <Popup
            latitude={newPin.latitude}
            longitude={newPin.longitude}
            closeButton={true}
            closeOnClick={false}
            anchor="bottom"
            onClose={() => setNewPin({
              username: "",
              title: "",
              description: "",
              rating: "",
              latitude: 0,
              longitude: 0
            })}
          >
            <div className='inputPopup'>
              <form onSubmit={handleSubmit}>
                <label>Location</label>
                <input placeholder='Enter a location' onChange={(e) => setLocation(e.target.value)} />
                <label>Image</label>
                <textarea placeholder='Add link to location image' onChange={(e) => setImage(e.target.value)} />
                <label>Movie</label>
                <textarea placeholder='This place appeared in...' onChange={(e) => setMovie(e.target.value)} />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
                <label>Video</label>
                <textarea placeholder='Add link to Youtube video' onChange={(e) => setVideo(e.target.value)} />
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
