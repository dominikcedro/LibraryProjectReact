import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Button, LinearProgress, MenuItem } from '@mui/material';
import { TextField } from 'formik-material-ui';
import * as yup from 'yup';
import { createReview } from '../api/api';

const validationSchema = yup.object({
  rating: yup
    .number()
    .required('Rating is required')
    .integer('Rating must be an integer')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  content: yup
    .string()
    .max(50, 'Review must be at most 50 characters')
    .required('Review is required'),
});

interface ReviewFormProps {
  bookId: number;
}

const ReviewForm = ({ bookId }: ReviewFormProps) => {
  const initialValues = {
    rating: 0,
    content: '',
  };

  interface FormValues {
    rating: number;
    content: string;
  }

  const onSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      const response = await createReview(bookId, values.rating, values.content);

      if (response) {
        console.log('Review created successfully');
      } else {
        console.log('Failed to create review');
      }
    }

    setSubmitting(false);
  };

  return (
    <Formik

      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            component={TextField}
            name="rating"
            type="number"
            label="Rating"
            select
            variant="standard"
            helperText="Please select your rating"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Field>
          <br />
          <Field
            component={TextField}
            type="text"
            label="Review"
            name="content"
          />
          {isSubmitting && <LinearProgress />}
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewForm;