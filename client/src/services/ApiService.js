const userUrl = "http://localhost:3001/routes/users"
const pinsUrl= "http://localhost:3001/routes/pins"


const addUser = async (user) => {
  try {
    const res = await fetch(`${userUrl}/register`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user)
    });
    return await res.json();

  } catch(e) {
    console.log(e);
  }
}

const findUser = async (user) => {
  try {
    const res = await fetch(`${userUrl}/login`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user) 
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}

const getAllPins = async () => {
  try {
    const res = await fetch(`${pinsUrl}`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
      },
    });
    return await res.json();
  } catch (e) {
    console.log(e)
  }
}

const addPin = async (pin) => {
  try {
    const res = await fetch(`${pinsUrl}`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(pin) 
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  addUser,
  findUser,
  getAllPins,
  addPin
}

// const getCompanies = async () => {
//   const res = await fetch(`${baseUrl}options`);
//   return await res.json();
// }


// //getPins

// try {
//   const res = await axios.get(process.env.REACT_APP_API);
//   setPins(res.data);
// } catch (e) {
//   console.log(e)
// }


  // register
  //   try {
  //     await axios.post('http://localhost:3001/routes/users/register', newUser)
  //     setError(false);
  //     setSuccess(true);
  //   } catch (e) {
  //     console.log(e)
  //     setError(true);
  //     setSuccess(false);
  //   }

    // login
    // try {
    //   const res = await axios.post('http://localhost:3001/routes/users/login', user);
    //   myStorage.setItem('user', res.data.username);
    //   setCurrentUser(res.data.username);
    //   setShowLogin(false);
    // } catch (e) {
    //   console.log(e)
    //   setError(true);
    // }