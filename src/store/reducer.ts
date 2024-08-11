import { createReducer } from '@reduxjs/toolkit';
import { CityInfo } from '../const';
import { CityType, SortNameType } from '../lib/types';
import { OfferType } from '../lib/types';
import { setCurrentCity, setOffers, setCurrentSort } from './action';

type InitialState = {
  offers: OfferType[];
  currentCity: CityType;
  favorites: OfferType[];
  currentSort: SortNameType;
};

const initialState: InitialState = {
  offers: [],
  currentCity: CityInfo[0],
  favorites: [],
  currentSort: 'Popular'
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setCurrentSort, (state, action) => {
      state.currentSort = action.payload;
    });
});

