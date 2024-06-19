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
import TextField from "@mui/material/TextField";
import { createReview } from '../api/api.js';
import withAuth from './WithAuth';
import WithAuth from "./WithAuth";


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
const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
const [reviewRating, setReviewRating] = useState(0);
const [reviewContent, setReviewContent] = useState('');

const maxBooks = 5;
const currentBooks = loans.length;
const meterWidth = (currentBooks / maxBooks) * 100;


const handleReturnClick = (loan: Loan) => {
  setSelectedLoanToReturn(loan);
  setReviewDialogOpen(true);
};

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

    const handleSubmitReview = async () => {
  if (selectedLoanToReturn) {
    const review = await createReview(selectedLoanToReturn.bookId, reviewRating, reviewContent);
    if (review) {
      console.log('Review submitted successfully');
      // Delete the loan after the review is successfully created
      handleReturnLoan();
    } else {
      console.log('Error submitting review');
    }
  }

  // Reset the review form and close the dialog
  setReviewRating(0);
  setReviewContent('');
  setReviewDialogOpen(false);
};
    return (
        <div className="my-shelf">
            <div className="meter">
                <div className="meter-fill" style={{width: `${meterWidth}%`}}/>
                <div className="meter-text">Your loan limit</div>

            </div>
            {loans.map(loan => (
                <div key={loan.id} className="loan-item">
                    <div className="loan-item-column">
                        <p>{t('my_shelf.title')}: {loan.book.title}</p>
                        <p>{t('my_shelf.author')}: {loan.book.author}</p>
                        <p>{t('my_shelf.isbn')}: {loan.book.isbn}</p>
                    </div>
                    <div className="loan-item-column">
                        <p>{t('my_shelf.loan_date')}: {new Date(loan.loanDate).toLocaleDateString()}</p>
                        <p>{t('my_shelf.return_date')}: {new Date(loan.returnDate).toLocaleDateString()}</p>
                    </div>
                    <div className="loan-item-column">
                        <button className="loan-button" onClick={() => handleOpen(loan)}>{t('my_shelf.extend')}</button>
                        <button className="loan-button"
                                onClick={() => handleReturnClick(loan)}>{t('my_shelf.return')}</button>
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
            <Dialog open={reviewDialogOpen} onClose={() => setReviewDialogOpen(false)}>
                <DialogTitle>{t('reviews.write_review')}</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            label={t('reviews.rating')}
                            type="number"
                            InputProps={{inputProps: {min: 0, max: 5}}}
                            value={reviewRating}
                            onChange={(event) => setReviewRating(Number(event.target.value))}
                        />
                        <TextField
                            label={t('reviews.review')}
                            multiline
                            rows={4}
                            value={reviewContent}
                            onChange={(event) => setReviewContent(event.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmitReview}>{t('reviews.submit')}</Button>
                    <Button onClick={() => setReviewDialogOpen(false)}>{t('reviews.cancel')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}

export default MyShelf;