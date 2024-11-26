import type { ItemData } from '../interfaces/ItemData';

import AuthService from '../utils/auth';

// GET /api/inventory endpoint to get all items
const getItems = async (): Promise<ItemData[]> => {
  if (!AuthService.loggedIn()) {
    return Promise.reject('User is not authenticated');
  }

  try {
    const response = await fetch('/api/inventory', {
      headers: {
        Authorization: `Bearer ${AuthService.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Could not retrieve items');
    }

    const data = await response.json();
    return data;

  } catch (err) {
    console.log('Error from item API: ', err);
    return Promise.reject('Could not fetch items');
  }
};

// POST /api/inventory endpoint to add item
const postItem = async (item: ItemData): Promise<ItemData> => {
  if (!AuthService.loggedIn()) {
    return Promise.reject('User is not authenticated');
  }

  try {
    const response = await fetch('/api/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AuthService.getToken()}`,
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error('Could not add item');
    }

    const data = await response.json();
    return data;

  } catch (err) {
    console.log('Error from item API: ', err);
    return Promise.reject('Could not add item');
  }
}

export { getItems, postItem };