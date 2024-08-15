import classNames from 'classnames';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import FavoriteButton from './favorite-button';
import { Spinner } from '../spinner/spinner';
import { NearPlaces } from '../near-places/near-places';
import { ReviewForm } from '../review-form/review-form';
import { NotFound404 } from '../not-found-404/not-found-404';
import { PlaceRating } from '../place-rating/place-rating';
import { Map } from '../map/map';

import {
  fetchNearbyOfferAction,
  fetchOfferDetailAction,
} from '../../store/api-actions';

export const Offer = (): JSX.Element => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferDetailAction({ id }));
    dispatch(fetchNearbyOfferAction({ id }));
  }, [dispatch, id]);

  const nearPlaceOffers = useAppSelector((state) =>
    state.nearPlaceOffers.slice(0, 3)
  );
  const offer = useAppSelector((state) => state.offer);

  if (!id) {
    return <NotFound404 />;
  }

  return offer ? (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {offer.images.slice(0, 6).map((image, index) => {
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
            <FavoriteButton
              baseClass="offer"
              isFavorite={offer.isFavorite}
              id={offer.id}
            >
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
            </FavoriteButton>
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
              <div
                className={classNames(
                  'offer__avatar-wrapper',
                  'user__avatar-wrapper',
                  {
                    'offer__avatar-wrapper--pro': offer.host.isPro,
                  }
                )}
              >
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
          <ReviewForm />
        </div>
      </div>

      {nearPlaceOffers && (
        <>
          <Map
            currentOffer={offer}
            offers={[offer, ...nearPlaceOffers]}
            city={offer.city}
            place="offer"
          />
          <div className="container">
            <NearPlaces offers={nearPlaceOffers} />
          </div>
        </>
      )}
    </section>
  ) : (
    <Spinner />
  );
};
