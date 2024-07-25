import { useState } from 'react';
import PlaceCard from '../place-card/place-card';
import { AppProps } from '../../lib/types';

const PlaceCardList = ({ offersCount, offers }: AppProps): JSX.Element => {
  // Переменная activeOffer нужна будет потом
  const [/*activeOffer,*/, setActiveOffer] = useState<string | null>(null);

  const handleCardMouseMove = (id: string) => {
    setActiveOffer(id);
  };

  const handleCardMouseLeave = () => {
    setActiveOffer(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          {...offer}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        />
      )).slice(0, offersCount)}
    </div>
  );
};

export default PlaceCardList;
