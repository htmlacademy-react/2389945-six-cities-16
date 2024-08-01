import PlaceCard from '../place-card/place-card';
import { OfferType } from '../../lib/types';
import { getFavoriteOffers, getOffersByCity } from './utils';

type FavoritesProps = {
  offers: OfferType[];
};

const Favorites = (props: FavoritesProps): JSX.Element => {
  const favoriteOffers: OfferType[] = getFavoriteOffers(props.offers);
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

export default Favorites;
