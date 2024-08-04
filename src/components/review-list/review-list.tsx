import { ReviewType } from '../../lib/types';
import { ReviewItem } from '../review-item/review-item';

type OfferReviewListProps = {
  reviews: ReviewType[];
};

const ReviewList = (props: OfferReviewListProps): JSX.Element => {
  const { reviews } = props;
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem review={review} key={review.id} />
      ))}
    </ul>
  );
};

export default ReviewList;
