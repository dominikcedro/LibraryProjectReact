// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // replace with your API base URL
});
export const loginUser = async (username, password) => {
  try {
    const response = await instance.post('/api/auth/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in', error);
    return null;
  }
};


export const getBooks = async () => {
  try {
    const token = localStorage.getItem('jwtToken');
    const response = await instance.get('/books', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.map(book => ({
      ...book,
      coverImageUrl: book.coverImageUrl, // Ensure this line is present
    }));
  } catch (error) {
    console.error('Error getting books', error);
    return null;
  }
};