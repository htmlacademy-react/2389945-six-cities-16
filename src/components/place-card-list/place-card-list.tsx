import { PlaceCard } from '../place-card/place-card';
import { OfferType, SortNameType } from '../../lib/types';
import { SortList } from '../sort-list/sort-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentSort } from '../../store/action';
//import { fnCompareSortValues } from '../../const';
import { Spinner } from '../spinner/spinner';

type PlaceCardListProps = {
  offers: OfferType[];
  onSelectedOfferChange: React.Dispatch<React.SetStateAction<OfferType | null>>;
};

export const PlaceCardList = (props: PlaceCardListProps): JSX.Element => {
  const { offers, onSelectedOfferChange } = props;
  /*
  const offers = useAppSelector((state) =>
    //console.log(state.offers);
    state.offers
      .filter((offer) => offer.city.name === state.currentCity.name)
      .sort((valueOne, valueTwo) =>
        fnCompareSortValues(state.currentSort, valueOne, valueTwo)
      )
  );
  */

  console.log(offers);

  const activeSort = useAppSelector((state) => state.currentSort);
  const dispatch = useAppDispatch();

  const onSortingChange = (name: SortNameType) => {
    dispatch(setCurrentSort(name));
  };

  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);

  if (isOffersLoading) {
    return <Spinner />;
  }

  return (
    <>
      <SortList onChange={onSortingChange} activeSort={activeSort} />
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            {...{ offer }}
            onMouseMove={() => onSelectedOfferChange(offer)}
            onMouseLeave={() => onSelectedOfferChange(null)}
          />
        ))}
      </div>
    </>
  );
};
