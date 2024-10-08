import { FormEvent, useState } from 'react';
import { OffersSettings, RateSettings } from '../../const';
import { RateForm } from '../rate-form/rate-form';

export const ReviewForm = (): JSX.Element => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const onChangeData = (evt: FormEvent): void => {
    const { name, value } = evt.target as HTMLFormElement;
    if (name === 'rating') {
      setRating(+value);
    } else if (name === 'review') {
      setReview(String(value));
    }
  };

  const isSubmitButtonDisabled =
    !rating ||
    review.length < OffersSettings.reviewText.minLength ||
    review.length > OffersSettings.reviewText.maxLength;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onChange={onChangeData}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RateSettings.map((rateItem) => {
          const keyValue = `${rateItem.mark}-rating`;
          return <RateForm rate={rateItem} key={keyValue} />;
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitButtonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
