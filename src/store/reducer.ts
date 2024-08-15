import { createReducer } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';
import { AuthorizationStatus, CityInfo, SortingList } from '../const';

import {
  appendFavoriteOffer,
  appendReview,
  clearFavoritesOffers,
  deleteFavoriteOffer,
  setAuthorizationStatus,
  setCurrentCity,
  setCurrentSort,
  setFavoriteOffers,
  setNearPlaceOffers,
  setOffer,
  setOffers,
  setOffersLoading,
  setResponseStatus,
  setReviews,
  setUserProfile,
} from './action';

import {
  AuthInfoType,
  CityType,
  OfferInfoType,
  ReviewType,
  OfferType
} from '../lib/types';

type InitialState = {
  offers: OfferType[];
  offer: OfferInfoType | null;
  nearPlaceOffers: OfferType[];
  reviews: ReviewType[] | [];
  currentCity: CityType;
  favoriteOffers: OfferType[];
  currentSort: SortingList;
  authorizationStatus: AuthorizationStatus;
  userProfile: AuthInfoType | null;
  isOffersLoading: boolean;
  responseStatus: StatusCodes;
};

const initialState: InitialState = {
  offers: [],
  offer: null,
  nearPlaceOffers: [],
  reviews: [],
  currentCity: CityInfo[0],
  favoriteOffers: [],
  currentSort: SortingList.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  userProfile: null,
  isOffersLoading: false,
  responseStatus: StatusCodes.ACCEPTED,
};

const setIsFavoriteState = (
  offers: OfferType[],
  newOfferState: OfferType
): void => {
  offers.some((offer) => {
    if (offer.id === newOfferState.id) {
      offer.isFavorite = newOfferState.isFavorite;
      return true;
    }
  });
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setCurrentSort, (state, action) => {
      state.currentSort = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersLoading, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setUserProfile, (state, action) => {
      state.userProfile = action.payload;
    })
    .addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(appendReview, (state, action) => {
      state.reviews = [...state.reviews, action.payload];
    })
    .addCase(appendFavoriteOffer, (state, action) => {
      state.favoriteOffers = [...state.favoriteOffers, action.payload];
      setIsFavoriteState(state.offers, action.payload);
    })
    .addCase(deleteFavoriteOffer, (state, action) => {
      state.favoriteOffers = state.favoriteOffers.filter(
        (offer) => offer.id !== action.payload.id
      );
      setIsFavoriteState(state.offers, action.payload);
    })
    .addCase(setNearPlaceOffers, (state, action) => {
      state.nearPlaceOffers = action.payload;
    })
    .addCase(setFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
      state.favoriteOffers.map((favoriteOffer) => {
        setIsFavoriteState(state.offers, favoriteOffer);
      });
    })
    .addCase(clearFavoritesOffers, (state) => {
      state.offers.map((offer) => (offer.isFavorite = false));
      state.nearPlaceOffers.map((offer) => (offer.isFavorite = false));
      if (state.offer) {
        state.offer.isFavorite = false;
      }
      state.favoriteOffers = [];
    })
    .addCase(setResponseStatus, (state, action) => {
      state.responseStatus = action.payload;
    });
});

export { reducer };
