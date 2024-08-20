import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiRoute, AuthorizationStatus } from '../const';
import { dropToken, setToken } from '../services/token';
import { AppDispatch, State } from '../lib/state';

import {
  AuthInfoType,
  OfferInfoType,
  OfferType,
  ReviewType,
} from '../lib/types';

import {
  appendFavoriteOffer,
  appendReview,
  clearFavoritesOffers,
  deleteFavoriteOffer,
  setAuthorizationStatus,
  setFavoriteOffers,
  setNearPlaceOffers,
  setOffer,
  setOffers,
  setOffersLoading,
  setResponseStatus,
  setReviews,
  setUserProfile,
} from './action';

type AsyncThunkPropWithAxios = {
  state: State;
  dispatch: AppDispatch;
  extra: AxiosInstance;
};

export const fetchOfferAction = createAsyncThunk<
  void,
  undefined,
  AsyncThunkPropWithAxios
>('fetchOfferAction', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersLoading(true));
  const { data } = await api.get<OfferType[]>(ApiRoute.Offers);

  console.log(data);
  dispatch(setOffersLoading(false));
  dispatch(setOffers(data));
});

export const fetchOfferDetailAction = createAsyncThunk<
  void,
  { id: string | undefined },
  AsyncThunkPropWithAxios
>('fetchOfferDetailAction', async ({ id }, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<OfferInfoType>(
      `${ApiRoute.Offers}/${id}`
    );
    dispatch(setOffer(data));
  } catch (error) {
    const { response } = error as AxiosError;

    if (response) {
      dispatch(setResponseStatus(response.status));
    }
  }
});

export const fetchNearbyOfferAction = createAsyncThunk<
  void,
  { id: string | undefined },
  AsyncThunkPropWithAxios
>('fetchNearbyOfferAction', async ({ id }, { dispatch, extra: api }) => {
  const { data } = await api.get<ReviewType[]>(
    `${ApiRoute.Offers}/${id}/nearby`
  );
  dispatch(setNearPlaceOffers(data));
});

export const fetchFavoriteOffersAction = createAsyncThunk<
  void,
  undefined,
  AsyncThunkPropWithAxios
>('fetchFavoriteOffersAction', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferType[]>(ApiRoute.Favorite);
  dispatch(setFavoriteOffers(data));
});

export const postFavoriteOfferAction = createAsyncThunk<
  void,
  { id: string; isFavorite: boolean },
  AsyncThunkPropWithAxios
>(
  'postFavoriteOfferAction',
  async ({ id, isFavorite }, { dispatch, extra: api }) => {
    const { data } = await api.post<OfferType>(
      `${ApiRoute.Favorite}/${id}/${Number(isFavorite)}`
    );

    if (isFavorite) {
      dispatch(appendFavoriteOffer(data));
    } else {
      dispatch(deleteFavoriteOffer(data));
    }
  }
);

export const checkLoginAction = createAsyncThunk<
  void,
  undefined,
  AsyncThunkPropWithAxios
>('checkLoginAction', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<AuthInfoType>(ApiRoute.Login);
    setToken(data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserProfile(data));
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});

type LoginAuth = {
  email: string;
  password: string;
};

export const loginAction = createAsyncThunk<
  void,
  LoginAuth,
  AsyncThunkPropWithAxios
>('loginAction', async ({ email, password }, { dispatch, extra: api }) => {
  const requestBody: LoginAuth = {
    email: email,
    password: password,
  };

  try {
    const { data } = await api.post<AuthInfoType>(ApiRoute.Login, requestBody);
    setToken(data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserProfile(data));
  } catch (error) {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  AsyncThunkPropWithAxios
>('logoutAction', async (_arg, { dispatch, extra: api }) => {
  await api.delete(ApiRoute.Logout);
  dropToken();
  dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  dispatch(clearFavoritesOffers());
  dispatch(setUserProfile(null));
});

export const fetchReviewAction = createAsyncThunk<
  void,
  { id: string | undefined },
  AsyncThunkPropWithAxios
>('fetchReviewAction', async ({ id }, { dispatch, extra: api }) => {
  const { data } = await api.get<ReviewType[]>(`${ApiRoute.Comments}/${id}`);
  dispatch(setReviews(data));
});

export type PostReview = {
  id: string;
  comment: string;
  rating: number;
};

export const PostReviewAction = createAsyncThunk<
  void,
  PostReview,
  AsyncThunkPropWithAxios
>(
  'PostReviewAction',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<ReviewType>(
        `${ApiRoute.Comments}/${id}`,
        {
          comment: comment,
          rating: rating,
        }
      );

      dispatch(appendReview(data));
    } catch (error) {
      //null;
    }
  }
);
