// api.js
import axios from 'axios';
import jwt_decode from 'jwt-decode';


const instance = axios.create({
  baseURL: 'http://localhost:8080', // replace with your API base URL
});


export const loginUser = async (username, password) => {
  try {
    const response = await instance.post('/api/auth/login', {
      username,
      password,
    });
    if (response.data) {
      const { token, userId } = response.data;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userId', userId.toString());
    }
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


// api.js
export const getReviewsForBook = async (bookId) => {
  try {
    const token = localStorage.getItem('jwtToken');
    const response = await instance.get(`/reviews/book/${bookId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error getting reviews for book ${bookId}`, error);
    return null;
  }
};

//loans

export const createLoan = async (bookId) => {
  try {
    const token = localStorage.getItem('jwtToken');
    const userId = localStorage.getItem('userId');

    const loanDate = new Date();
    const returnDate = new Date();
    returnDate.setMonth(returnDate.getMonth() + 3);

    const response = await instance.post('/loans', {
      userId,
      bookId,
      loanDate,
      returnDate,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating loan', error);
    return null;
  }
};