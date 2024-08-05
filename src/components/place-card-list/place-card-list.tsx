import { PlaceCard } from '../place-card/place-card';
import { AppProps } from '../../lib/types';
import { OfferType } from '../../lib/types';

type PlaceCardListProps = AppProps & {
  onSelectedOfferChange: React.Dispatch<React.SetStateAction<OfferType | null>>;
};

const PlaceCardList = (props: PlaceCardListProps): JSX.Element => {
  const { offers, onSelectedOfferChange } = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers
        .map((offer) => (
          <PlaceCard
            key={offer.id}
            {...{ offer }}
            onMouseMove={() => onSelectedOfferChange(offer)}
            onMouseLeave={() => onSelectedOfferChange(null)}
          />
        ))
        .slice(0, props.offersCount)}
    </div>
  );
};

export default PlaceCardList;
