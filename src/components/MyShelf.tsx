// MyShelf.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./MyShelf.css";

type Loan = {
  id: number;
  userId: number;
  bookId: number;
  loanDate: string;
  returnDate: string;
  book: {
    title: string;
    author: string;
    isbn: string;
  };
};

const MyShelf = () => {
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      axios.get(`http://localhost:8080/loans/user/${userId}`)
        .then(response => {
          const sortedLoans = response.data.sort((a: Loan, b: Loan) => new Date(a.returnDate).getTime() - new Date(b.returnDate).getTime());
          const promises = sortedLoans.map((loan: Loan) =>
  axios.get(`http://localhost:8080/books/${loan.bookId}`)
    .then(response => ({...loan, book: response.data}))
);
          Promise.all(promises)
            .then(updatedLoans => setLoans(updatedLoans))
            .catch(error => console.error('Error fetching book data:', error));
        })
        .catch(error => {
          console.error('Error fetching loans:', error);
        });
    }
  }, []);

  return (
    <div className="my-shelf">
      {loans.map(loan => (
        <div key={loan.id} className="loan-item">
          <div className="loan-item-column">
            <p>Title: {loan.book.title}</p>
            <p>Author: {loan.book.author}</p>
            <p>ISBN: {loan.book.isbn}</p>
          </div>
          <div className="loan-item-column">
            <p>Loan Date: {new Date(loan.loanDate).toLocaleDateString()}</p>
            <p>Return Date: {new Date(loan.returnDate).toLocaleDateString()}</p>
          </div>
          <div className="loan-item-column">
            <button className="loan-button">Extend</button>
            <button className="loan-button">Return</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyShelf;