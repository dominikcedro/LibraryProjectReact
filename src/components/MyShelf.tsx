// MyShelf.tsx
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./MyShelf.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {MenuItem, Select} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useTranslation } from 'react-i18next';

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
    const [extensionWeeks, setExtensionWeeks] = useState<number>(1);
    const [open, setOpen] = useState(false);
const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
const [returnConfirmOpen, setReturnConfirmOpen] = useState(false);
const [selectedLoanToReturn, setSelectedLoanToReturn] = useState<Loan | null>(null);
const { t } = useTranslation('global');
const handleClose = () => {
  setOpen(false);
};

const handleOpen = (loan: Loan) => {
  setSelectedLoan(loan);
  setOpen(true);
};

const handleExtendLoan = async (weeks: number) => {
  console.log('handleExtendLoan called with weeks:', weeks);

  if (selectedLoan) {
    const newReturnDate = new Date(selectedLoan.returnDate);
    newReturnDate.setDate(newReturnDate.getDate() + weeks * 7);

    const updatedLoan = {
      ...selectedLoan,
      returnDate: newReturnDate.toISOString(),
    };

    const response = await axios.put(`http://localhost:8080/loans/${selectedLoan.id}`, updatedLoan);

    if (response.status === 200) {
      alert('Loan extended successfully');
      // Update the loans state with the updated loan data
      setLoans(loans.map(loan => loan.id === selectedLoan.id ? updatedLoan : loan));
    } else {
      alert('Error extending loan');
    }
  }

  handleClose();
};

const handleReturnLoan = async () => {
  console.log('handleReturnLoan called');

  if (selectedLoanToReturn) {
    const response = await axios.delete(`http://localhost:8080/loans/${selectedLoanToReturn.id}`);

    if (response.status === 200) {
      alert('Loan returned successfully');
      // Update the loans state to remove the returned loan
      setLoans(loans.filter(loan => loan.id !== selectedLoanToReturn.id));
    } else {
      alert('Error returning loan');
    }
  }

  setReturnConfirmOpen(false);
};
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
              <button className="loan-button" onClick={() => handleOpen(loan)}>Extend</button>
              <button className="loan-button" onClick={() => {
                  setSelectedLoanToReturn(loan);
                  setReturnConfirmOpen(true);
              }}>Return
              </button>
          </div>
      </div>
    ))}

      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Choose Extension Duration</DialogTitle>
          <DialogContent>
              <DialogContentText>
                  Please choose the number of weeks to extend the loan.
              </DialogContentText>
              <Select
          value={extensionWeeks}
          onChange={(event) => setExtensionWeeks(event.target.value as number)}
        >
          <MenuItem value={1}>1 Week</MenuItem>
          <MenuItem value={2}>2 Weeks</MenuItem>
          <MenuItem value={3}>3 Weeks</MenuItem>
          <MenuItem value={4}>4 Weeks</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleExtendLoan(extensionWeeks)}>Extend Loan</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>

      <Dialog open={returnConfirmOpen} onClose={() => setReturnConfirmOpen(false)}>
  <DialogTitle>{/* Translation */"Please confirm you are returning the book"}</DialogTitle>
  <DialogActions>
    <Button onClick={handleReturnLoan}>{/* Translation */"Yes"}</Button>
    <Button onClick={() => setReturnConfirmOpen(false)}>{/* Translation */"No"}</Button>
  </DialogActions>
</Dialog>
  </div>
);

}

export default MyShelf;