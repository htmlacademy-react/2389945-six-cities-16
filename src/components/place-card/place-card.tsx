import { AppRoute } from '../../const';
import { OfferType } from '../../lib/types';

type PlaceCardProps = {
  offer: OfferType;
  onMouseMove?: (id: string) => void;
  onMouseLeave?: () => void;
  place?: 'cities' | 'favorites' | 'near-places';
};

export const PlaceCard = (props: PlaceCardProps): JSX.Element => {
  const {
    offer,
    place = 'cities',
    onMouseMove = () => void {},
    onMouseLeave = () => void {},
  } = props;

  const handleMouseMove = () => onMouseMove(offer.id);

  const handleMouseLeave = () => onMouseLeave();

  return (
    <article
      className={`${place}__card place-card`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${place}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button${
              offer.isFavorite ? ' place-card__bookmark-button--active' : ''
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
                width: `${Math.round(offer.rating) * 20}%`,
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};
