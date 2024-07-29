import { OfferType } from '../../lib/types';

export const getFavoriteOffers = (offers: OfferType[]): OfferType[] => offers.filter((offer) => offer.isFavorite);

export const getOffersByCity = (offers: OfferType[]) =>
  offers.reduce<{
    [key: string]: OfferType[];
  }>((acc, current) => {
    const city = current.city.name;
    if (!(city in acc)) {
      acc[city] = [];
      acc[city].push(current);
    }
    return acc;
  }, {});


