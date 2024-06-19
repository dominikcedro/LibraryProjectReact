import React from "react";
import {useTranslation} from 'react-i18next'; // Import useTranslation hook

// Reviews.tsx
interface Review {
    userId: number;
    bookId: number | null;
    content: string;
    rating: number;
    userEmail: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const ReviewComponent: React.FC<{ review: Review }> = ({ review }) => {
  const {t, i18n} = useTranslation('global'); // Use useTranslation hook

  return (
    <div className="review-item">
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div style={{ marginRight: '10px' }}>
          <strong>{t('reviews.rating')}:</strong> {review.rating}/5
        </div>
        <div style={{ marginRight: '10px' }}>
          <strong>{t('reviews.review')}:</strong> {review.content}
        </div>
        <div>
          <strong>{t('reviews.user')}:</strong> {review.userEmail}
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
        <ReviewComponent key={review.userId} review={review} />
      ))}
    </div>
  );
};

export default Reviews;