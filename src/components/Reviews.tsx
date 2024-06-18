import React from "react";

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
  return (
    <div className="review-item">
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div style={{ marginRight: '10px' }}>
          <strong>Rating:</strong> {review.rating}/5
        </div>
        <div>
          <strong>Review:</strong> {review.content}
        </div>
        <div>
          <strong>User:</strong> {review.user ? review.user.username : 'N/A'}
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