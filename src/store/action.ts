import { createAction, PrepareAction } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';
import { AppRoute, AuthorizationStatus, SortingList } from '../const';
import {
  AuthInfoType,
  CityType,
  OfferInfoType,
  OfferType,
  ReviewType,
} from '../lib/types';

export const setCurrentCity = createAction<PrepareAction<CityType>>(
  'setCurrentCity',
  (city: CityType) => ({ payload: city })
);

export const setOffers = createAction<PrepareAction<OfferType[]>>(
  'setOffers',
  (offers: OfferType[]) => ({ payload: offers })
);

export const setFavoriteOffers = createAction<PrepareAction<OfferType[]>>(
  'setFavoriteOffers',
  (offers: OfferType[]) => ({ payload: offers })
);

export const clearFavoritesOffers = createAction('clearFavoritesOffers');

export const appendFavoriteOffer = createAction<PrepareAction<OfferType>>(
  'appendFavoriteOffer',
  (offer: OfferType) => ({ payload: offer })
);

export const deleteFavoriteOffer = createAction<PrepareAction<OfferType>>(
  'deleteFavoriteOffer',
  (offer: OfferType) => ({ payload: offer })
);

export const setNearPlaceOffers = createAction<PrepareAction<OfferType[]>>(
  'setNearbyOffers',
  (nearbyOffers: OfferType[]) => ({ payload: nearbyOffers })
);

export const setOffer = createAction<PrepareAction<OfferInfoType>>(
  'setOffer',
  (offer: OfferInfoType) => ({ payload: offer })
);

export const setReviews = createAction<PrepareAction<ReviewType[]>>(
  'setReviews',
  (reviews: ReviewType[]) => ({ payload: reviews })
);

export const appendReview = createAction<PrepareAction<ReviewType>>(
  'appendReview',
  (review: ReviewType) => ({ payload: review })
);

export const setCurrentSort = createAction<PrepareAction<SortingList>>(
  'setCurrentSort',
  (sort: SortingList) => ({ payload: sort })
);

export const setAuthorizationStatus = createAction<
  PrepareAction<AuthorizationStatus>
>('setAuthorizationStatus', (status: AuthorizationStatus) => ({
  payload: status,
}));

export const setOffersLoading = createAction<boolean>('setOffersLoading');

export const setUserProfile = createAction<PrepareAction<AuthInfoType>>(
  'setUserProfile',
  (user: AuthInfoType) => ({ payload: user })
);

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export const setResponseStatus = createAction<StatusCodes>('setResponseStatus');
