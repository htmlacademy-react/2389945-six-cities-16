//import { useState } from 'react';
import { Offer, PlaceCardListProps } from '../../lib/types';
import PlaceCard from '../place-card/place-card';

function PlaceCardList(props: PlaceCardListProps): JSX.Element {
  const { offers } = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer: Offer) => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          //onActiveCardChange={setActivePlaceCard}
        />
      ))}
    </div>
  );
}
export default PlaceCardList;
