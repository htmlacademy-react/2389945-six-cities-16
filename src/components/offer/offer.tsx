import ReviewForm from '../review-form/review-form';
import Map from '../map/map';
import { OfferInfoType } from '../../lib/types';
import { OFFERS } from '../../mocks/offers';
import { REVIEWS } from '../../mocks/reviews';
import NearPlaces from '../near-places/near-places';
import { PlaceRating } from '../place-rating/place-rating';
import ReviewList from '../review-list/review-list';

type OfferProps = {
  offer: OfferInfoType;
};

const Offer = (props: OfferProps): JSX.Element => {
  const { offer } = props;

  const nearPlaceOffers = OFFERS.filter(
    (nearbyOffer) =>
      nearbyOffer.city.name === offer.city.name && nearbyOffer.id !== offer.id
  ).slice(1, 4);

  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {offer.images.map((image, index) => {
            const keyValue = `${index}-image`;
            return (
              <div className="offer__image-wrapper" key={keyValue}>
                <img className="offer__image" src={image} alt="Photo studio" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {offer.isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">{offer.title}</h1>
            <button
              className={'offer__bookmark-button button'.concat(
                offer.isFavorite ? ' offer__bookmark-button--active' : ' '
              )}
              type="button"
            >
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">
                {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
              </span>
            </button>
          </div>
          <div className="offer__rating rating">
            <PlaceRating place="offer" rating={offer.rating}>
              <span className="offer__rating-value rating__value">
                {offer.rating}
              </span>
            </PlaceRating>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {offer.type}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {offer.bedrooms} Bedrooms
            </li>
            <li className="offer__feature offer__feature--adults">
              Max {offer.maxAdults} adults
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">€{offer.price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&amp;s inside</h2>
            <ul className="offer__inside-list">
              {offer.goods.map((good) => (
                <li className="offer__inside-item" key={good}>
                  {good}
                </li>
              ))}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">{offer.title}</h2>
            <div className="offer__host-user user">
              <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                <img
                  className="offer__avatar user__avatar"
                  src={offer.host.avatarUrl}
                  width="74"
                  height="74"
                  alt="Host avatar"
                />
              </div>
              <span className="offer__user-name">{offer.host.name}</span>
              {offer.host.isPro && (
                <span className="offer__user-status">Pro</span>
              )}
            </div>
            <div className="offer__description">
              <p className="offer__text">{offer.description}</p>
            </div>
          </div>
          <section className="offer__reviews reviews">
            <h2 className="reviews__title">
              Reviews ·{' '}
              <span className="reviews__amount">{REVIEWS.length}</span>
            </h2>
            <ReviewList reviews={REVIEWS} />
            <ReviewForm />
          </section>
        </div>
      </div>
      <Map offers={nearPlaceOffers} city={offer.city} />
      <div className="container">
        <NearPlaces offers={nearPlaceOffers} />
      </div>
    </section>
  );
};

export default Offer;
