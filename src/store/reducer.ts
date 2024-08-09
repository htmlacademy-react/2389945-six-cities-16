import { createReducer } from '@reduxjs/toolkit';
import { CityInfo } from '../const';
import { CityType } from '../lib/types';
import { OfferType } from '../lib/types';
import { setCurrentCity, setOffers } from './action';

type InitialState = {
  offers: OfferType[];
  currentCity: CityType;
  favorites: OfferType[];
};

const initialState: InitialState = {
  offers: [],
  currentCity: CityInfo[0],
  favorites: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
