import { OfferType } from '../../lib/types';
import PlaceCard from '../place-card/place-card';

type NearPlaceProps = {
  offers: OfferType[];
};

function NearPlaces(props: NearPlaceProps): JSX.Element {
  const { offers } = props;

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((offer: OfferType) => (
          <PlaceCard offer={offer} key={offer.id} place="near-places" />
        ))}
      </div>
    </section>
  );
}

export default NearPlaces;
