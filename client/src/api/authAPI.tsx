import type { UserLogin } from '../interfaces/UserLogin';

// POST /api/auth/login endpoint to login user
const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('User information not retrieved, check network tab!');
    }

    return data;

  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

// POST /api/auth/create endpoint to create user
const createUser = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('User information not retrieved, check network tab!');
    }

    return data;

  } catch (err) {
    console.log('Error from user creation: ', err);
    return Promise.reject('Could not create user');
  }
};

export { login, createUser };