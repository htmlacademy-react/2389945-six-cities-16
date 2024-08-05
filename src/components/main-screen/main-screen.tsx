import { Map } from '../map/map';
import { useState } from 'react';
import { AppProps } from '../../lib/types';
import { OfferType } from '../../lib/types';
import { CityType } from '../../lib/types';
import { CityList, CityInfo } from '../../const';
import { Cities } from '../cities/cities';
import PlaceCardList from '../place-card-list/place-card-list';

const MainScreen = ({ offersCount, offers }: AppProps): JSX.Element => {
  const [currentCity, setCurrentCity] = useState<CityType>(CityInfo[0]);
  const [currentOffer, setCurrentOffer] = useState<OfferType | null>(null);

  const handleCityClick = (cityName: string): void => {
    const selectedCity = CityInfo.find((city) => city.name === cityName);
    if (selectedCity) {
      setCurrentCity(selectedCity);
    }
  };

  const cityOffers = offers
    .filter((offer) => currentCity && offer.city.name === currentCity.name)
    .slice(0, offersCount);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <Cities
            cities={CityList}
            currentCity={currentCity}
            onCityClick={handleCityClick}
          />
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {offers.length} places to stay in {currentCity.name}
            </b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li
                  className="places__option places__option--active"
                  tabIndex={0}
                >
                  Popular
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: low to high
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: high to low
                </li>
                <li className="places__option" tabIndex={0}>
                  Top rated first
                </li>
              </ul>
            </form>
            <PlaceCardList
              offersCount={offersCount}
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

export default MainScreen;
