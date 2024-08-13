/*
import { createReducer } from '@reduxjs/toolkit';
import { CityInfo } from '../const';
import { CityType, SortNameType } from '../lib/types';
import { OfferType } from '../lib/types';
import { setCurrentCity, setOffers, setCurrentSort } from './action';
*/

import { createReducer } from '@reduxjs/toolkit';

import type { CityType, OfferType, OfferInfoType, SortNameType, UserType, CommentType } from '../lib/types';

import { setCurrentCity, fetchOffers, fetchOffer, fetchNearPlaceOffers, setCurrentSort, fetchUserStatus, loginUser, fetchComments, postComment } from './action';
import { AuthorizationStatus, CityList, CityInfo } from '../const';

type State = {
  currentCity: CityType;
  offers: OfferInfoType[];
  isOffersLoading: boolean;
  offer: OfferType | null;
  isOfferLoading: boolean;
  currentSort: SortNameType;
  authorizationStatus: AuthorizationStatus;
  user: UserType['email'];
  nearPlaceOffers: OfferInfoType[];
  comments: CommentType[];
};

const initialState: State = {
  currentCity: {
    name: CityList[0],
    location: CityInfo[0].location,
  },
  offers: [],
  isOffersLoading: false,
  offer: null,
  isOfferLoading: false,
  currentSort: 'Popular',
  authorizationStatus: AuthorizationStatus.NoAuth,
  user: '',
  nearPlaceOffers: [],
  comments: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setCurrentSort, (state, action) => {
      state.currentSort = action.payload;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffer.pending, (state) => {
      state.isOfferLoading = true;
    })
    .addCase(fetchOffer.fulfilled, (state, action) => {
      state.offer = action.payload;
      state.isOfferLoading = false;
    })
    .addCase(fetchOffer.rejected, (state) => {
      state.isOfferLoading = false;
    })
    .addCase(fetchNearPlaceOffers.fulfilled, (state, action) => {
      state.nearPlaceOffers = action.payload;
    })
    .addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(fetchUserStatus.fulfilled, (state, action) => {
      state.user = action.payload.email;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(fetchUserStatus.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(postComment.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
});
