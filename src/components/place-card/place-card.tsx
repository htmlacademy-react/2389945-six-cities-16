import { PlaceCardProps } from '../../lib/types';
import { AppRoute } from '../../const';

const PlaceCard = ({
  id,
  price,
  rating,
  title,
  isPremium,
  isFavorite,
  previewImage,
  type,
  place = 'cities',
  onMouseMove = () => void 0,
  onMouseLeave = () => void 0,
}: PlaceCardProps): JSX.Element => {
  const handleMouseMove = () => {
    onMouseMove(id);
  };

  return (
    <article
      className={`${place}__card place-card`}
      onMouseMove={handleMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${place}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button${
              isFavorite ? ' place-card__bookmark-button--active' : ''
            }`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{
                width: `${Math.round(rating) * 20}%`,
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href={`${AppRoute.Offer}/${id}`}>{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
