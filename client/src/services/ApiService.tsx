import { pin } from '../interfaces'
const userUrl = "http://localhost:3001/routes/users"
const pinsUrl = "http://localhost:3001/routes/pins"

export async function addUser (user: {
  username: string,
  email: string,
  password: string
}) {
  try {
    const res = await fetch(`${userUrl}/register`, {
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

export async function findUser (user: {
  username: string,
  password: string
}) {
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

export async function getAllPins () {
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

export async function addPin (pin: pin) {
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

export async function deletePin (pin: pin) {
  try {
    const res = await fetch(`${pinsUrl}`, {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(pin)
    });
    return await res
  } catch (e) {
    console.log(e);
  }
}