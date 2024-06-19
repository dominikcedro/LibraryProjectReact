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
      localStorage.setItem('userId', userId);
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

export const createLoan = async (userId, bookId, months) => {
  try {
    const token = localStorage.getItem('jwtToken');

    const loanDate = new Date();
    const returnDate = new Date();
    returnDate.setMonth(returnDate.getMonth() + months);

    const requestBody = {
      userId,
      bookId,
      loanDate: loanDate.toISOString(),
      returnDate: returnDate.toISOString(),
    };

    console.log('Sending request with body:', requestBody); // Log the request body

    const response = await instance.post('/loans', requestBody, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      console.log('Loan created successfully');
    } else {
      console.log('Failed to create loan, status code:', response.status);
    }

    return response.data;
  } catch (error) {
    console.error('Error creating loan', error);
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

// api.js
export const createReview = async (bookId, rating, content) => {
  try {
    const token = localStorage.getItem('jwtToken');
    const userId = localStorage.getItem('userId');
    const response = await instance.post(
      '/reviews',
      {
        userId,
        bookId,
        rating,
        content,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 200) {
      console.log('Review created successfully');
    } else {
      console.log('Failed to create review, status code:', response.status);
    }

    return response.data;
  } catch (error) {
    console.error('Error creating review', error);
    return null;
  }
};

