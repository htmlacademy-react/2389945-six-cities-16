import { createAction } from '@reduxjs/toolkit';
import { CityType, OfferType } from '../lib/types';

export const setCurrentCity = createAction(
  'setCurrentCity',
  (city: CityType) => ({ payload: city })
);

export const setOffers = createAction(
  'setOffers',
  (offers: OfferType[]) => ({ payload: offers })
);
