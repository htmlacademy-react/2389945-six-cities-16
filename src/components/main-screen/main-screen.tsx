import { Map } from '../map/map';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { OfferInfoType } from '../../lib/types';
import { CityList } from '../../const';
import { Cities } from '../cities/cities';
import { PlaceCardList } from '../place-card-list/place-card-list';

export const MainScreen = (): JSX.Element => {
  const [currentOffer, setCurrentOffer] = useState<OfferInfoType | null>(null);

  const currentCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offers);

  const cityOffers = offers.filter(
    (offer) => currentCity.name && offer.city.name === currentCity.name
  );

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <Cities cities={CityList} currentCity={currentCity} />
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {cityOffers.length} places to stay in {currentCity.name}
            </b>
            <PlaceCardList
              offers={cityOffers}
              onSelectedOfferChange={setCurrentOffer}
            />
          </section>
          <div className="cities__right-section">
            <Map
              offers={cityOffers}
              city={currentCity}
              currentOffer={currentOffer}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
