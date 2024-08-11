import { PlaceCard } from '../place-card/place-card';
import { AppProps, OfferType, SortNameType } from '../../lib/types';
import { SortList } from '../sort-list/sort-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentSort } from '../../store/action';
import { CompareSortValues } from '../../const';

type PlaceCardListProps = AppProps & {
  onSelectedOfferChange: React.Dispatch<React.SetStateAction<OfferType | null>>;
};

export const PlaceCardList = (props: PlaceCardListProps): JSX.Element => {
  const { onSelectedOfferChange } = props;
  const offers = useAppSelector((state) =>
    state.offers
      .filter((offer) => offer.city.name === state.currentCity.name)
      .sort(CompareSortValues[state.currentSort])
  );
  const activeSort = useAppSelector((state) => state.currentSort);
  const dispatch = useAppDispatch();
  const onSortingChange = (name: SortNameType) => {
    dispatch(setCurrentSort(name));
  };

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
