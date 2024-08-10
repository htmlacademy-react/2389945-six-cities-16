import { RateType } from '../../lib/types';

type RateFormProps = {
  rate: RateType;
};

export const RateForm = (props: RateFormProps): JSX.Element => {
  const { name, mark } = props.rate;
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={mark}
        id={`${mark}-stars`}
        type="radio"
      />
      <label
        htmlFor={`${mark}-stars`}
        className="reviews__rating-label form__rating-label"
        title={name}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
};
