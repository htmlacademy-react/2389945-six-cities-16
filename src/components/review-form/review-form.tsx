import type { ChangeEvent } from 'react';
import { Fragment, useState } from 'react';
import { OffersSettings } from '../../const';

const ReviewForm = () => {
  const [text, setText] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Array.from({ length: OffersSettings.starsCount }, (_, i) => (
          <Fragment key={`Star ${OffersSettings.starsCount - i}`}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={OffersSettings.starsCount - i}
              id={`${OffersSettings.starsCount - i}-stars`}
              type="radio"
              checked={OffersSettings.starsCount - i === rating}
              onChange={handleInputChange}
            />
            <label
              htmlFor={`${OffersSettings.starsCount - i}-stars`}
              className="reviews__rating-label form__rating-label"
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={text}
        onChange={handleTextareaChange}
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
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
