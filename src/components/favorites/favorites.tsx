import { useAppSelector } from '../../hooks';
import { PlaceCard } from '../place-card/place-card';
import { getOffersByCity } from './utils';

export const Favorites = (): JSX.Element => {
  const offers = useAppSelector((state) => state.offers);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const favoriteOffersByCity = getOffersByCity(favoriteOffers);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {Object.keys(favoriteOffersByCity).map((city) => (
              <li className="favorites__locations-items" key={`fav-${city}`}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{city}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {favoriteOffersByCity[city].map((offer) => (
                    <PlaceCard key={offer.id} offer={offer} place="favorites" />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};
