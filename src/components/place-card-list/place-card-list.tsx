//import { useState } from 'react';
import PlaceCard from '../place-card/place-card';
import { AppProps } from '../../lib/types';
import { OfferType } from '../../lib/types';

type PlaceCardListProps = AppProps & {
  onSelectedOfferChange: React.Dispatch<React.SetStateAction<OfferType | null>>;
};

//type PlaceCardListProps = AppProps;

const PlaceCardList = (props: PlaceCardListProps): JSX.Element => {
  const { offers, onSelectedOfferChange } = props;
  //const [activeOffer, setActiveOffer] = useState<OfferType | null>(null);

  /*
  const handleCardMouseMove = () => {
    setActiveOffer(activeOffer);
  };

  const handleCardMouseLeave = () => {
    setActiveOffer(null);
  };
  */

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers
        .map((offer) => (
          <PlaceCard
            key={offer.id}
            {...{ offer }}
            //onMouseMove={handleCardMouseMove}
            //onMouseLeave={handleCardMouseLeave}
            onSelectedOfferChange={onSelectedOfferChange}
          />
        ))
        .slice(0, props.offersCount)}
    </div>
  );
};

export default PlaceCardList;
