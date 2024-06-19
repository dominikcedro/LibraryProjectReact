import React from "react";
import {useTranslation} from 'react-i18next'; // Import useTranslation hook

// Reviews.tsx
interface Review {
  review_id: number;
  content: string;
  user: { user_id: number, username: string };
  book: { bookId: number };
  rating: number;
}

interface ReviewProps {
  review: Review;
}

interface ReviewsProps {
  reviews: Review[];
}

const ReviewComponent: React.FC<ReviewProps> = ({ review }) => {
      const {t, i18n} = useTranslation('global'); // Use useTranslation hook

  return (
    <div className="review-item">
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div style={{ marginRight: '10px' }}>
          <strong>{t('reviews.rating')}:</strong> {review.rating}/5
        </div>
        <div>
          <strong>{t('reviews.review')}:</strong> {review.content}
        </div>
        <div>
          <strong>{t('reviews.user')}:</strong> {review.user ? review.user.username : 'N/A'}
        </div>
      </div>
    </div>
  );
};

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  console.log('Reviews prop:', reviews); // Log the reviews prop
  return (
    <div>
      {reviews.map((review: Review) => (
        <ReviewComponent key={review.review_id} review={review} />
      ))}
    </div>
  );
};

export default Reviews;