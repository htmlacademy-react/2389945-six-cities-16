import type { History } from 'history';
import type { AxiosInstance, AxiosError } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import type { CityType, UserAuth, UserType, OfferType, OfferInfoType, SortNameType, CommentType, CommentAuth } from '../lib/types';
import { ApiRoute, AppRoute, HttpCode } from '../const';
import { setToken } from '../services/token';

type Extra = {
  api: AxiosInstance;
  history: History;
}

export const Action = {
  SET_CITY: 'city/set',
  FETCH_OFFERS: 'offers/fetch',
  FETCH_OFFER: 'offer/fetch',
  FETCH_NEARBY_OFFERS: 'offers/fetch-nearby',
  FETCH_COMMENTS: 'offer/fetch-comments',
  POST_COMMENT: 'offer/post-comment',
  SET_SORTING: 'sorting/set',
  LOGIN_USER: 'user/login',
  FETCH_USER_STATUS: 'user/fetch-status'
};

export const setCurrentCity = createAction<CityType>(Action.SET_CITY);
export const setCurrentSort = createAction<SortNameType>(Action.SET_SORTING);

export const fetchOffers = createAsyncThunk<OfferInfoType[], undefined, { extra: Extra }>(
  Action.FETCH_OFFERS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<OfferInfoType[]>(ApiRoute.Offers);

    return data;
  });

export const fetchOffer = createAsyncThunk<OfferType, OfferType['id'], { extra: Extra }>(
  Action.FETCH_OFFER,
  async (id, { extra }) => {
    const { api, history } = extra;

    try {
      const { data } = await api.get<OfferType>(`${ApiRoute.Offers}/${id}`);

      return data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.NotFound) {
        history.push(AppRoute.NotFound);
      }

      return Promise.reject(axiosError);
    }
  });

export const fetchNearPlaceOffers = createAsyncThunk<OfferType[], OfferType['id'], { extra: Extra }>(
  Action.FETCH_NEARBY_OFFERS,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<OfferType[]>(`${ApiRoute.Offers}/${id}/nearby`);

    return data;
  });

export const fetchComments = createAsyncThunk<CommentType[], OfferType['id'], { extra: Extra }>(
  Action.FETCH_COMMENTS,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<CommentType[]>(`${ApiRoute.Comments}/${id}`);

    return data;
  });

export const fetchUserStatus = createAsyncThunk<UserType, undefined, { extra: Extra }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<UserType>(ApiRoute.Login);

    return data;
  });

export const loginUser = createAsyncThunk<UserAuth['email'], UserAuth, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<UserType>(ApiRoute.Login, { email, password });
    const { token } = data;

    setToken(token);
    history.back();

    return email;
  });

export const postComment = createAsyncThunk<CommentType[], CommentAuth, { extra: Extra }>(
  Action.POST_COMMENT,
  async ({ id, comment, rating }, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<CommentType[]>(`${ApiRoute.Comments}/${id}`, { comment, rating });

    return data;
  });

