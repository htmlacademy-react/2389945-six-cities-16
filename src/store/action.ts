import { createAction } from '@reduxjs/toolkit';
import { CityType, OfferType, SortNameType } from '../lib/types';

export const Action = {
  SET_CURRENT_CITY: 'city/set',
  SET_OFFERS: 'offers/set',
  SET_SORTING: 'sorting/set'
};

export const setCurrentCity = createAction<CityType>(Action.SET_CURRENT_CITY);
export const setOffers = createAction<OfferType[]>(Action.SET_OFFERS);
export const setCurrentSort = createAction<SortNameType>(Action.SET_SORTING);
