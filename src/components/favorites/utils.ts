import { OfferInfoType } from '../../lib/types';

export const getFavoriteOffers = (offers: OfferInfoType[]): OfferInfoType[] => offers.filter((offer) => offer.isFavorite);

export const getOffersByCity = (offers: OfferInfoType[]) =>
  offers.reduce<{
    [key: string]: OfferInfoType[];
  }>((acc, current) => {
    const city = current.city.name;
    if (!(city in acc)) {
      acc[city] = [];
      acc[city].push(current);
    }
    return acc;
  }, {});


