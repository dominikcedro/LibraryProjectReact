import React from "react";

interface Review {
  review_id: number;
  content: string;
  user: { user_id: number; username: string; };
  book: number;
  rating: number;
}

interface ReviewProps {
  review: Review;
}

interface ReviewsProps {
  reviews: Review[];
}

const ReviewComponent: React.FC<ReviewProps> = ({ review }) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px' }}>
      <div style={{ marginRight: '10px' }}>
        <strong>Rating:</strong> {review.rating}/5
      </div>
      <div>
        <strong>Review:</strong> {review.content}
      </div>
    </div>
  );
};

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review: Review) => (
        <ReviewComponent key={review.review_id} review={review} />
      ))}
    </div>
  );
};

export default Reviews;