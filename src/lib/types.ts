import { AuthorizationStatus } from '../const';
import { SortingList } from '../const';

export type LocationType = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CityType = {
  name: string;
  location: LocationType;
};

export type OfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type ReviewType = {
  id: string;
  date: string;
  user: UserType;
  comment: string;
  rating: number;
};

export type OfferInfoType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: UserType;
  images: string[];
  maxAdults: number;
};

export type AppProps = {
  offers: OfferType[];
};

export type HeaderProps = {
  authorizationStatus: AuthorizationStatus;
};

export type RateType = {
  name: string;
  mark: number;
};

export type SortNameType = keyof typeof SortingList;

export type UserType = {
  id: number;
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export type CommentType = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: UserType;
};

export type UserAuth = Pick<UserType, 'email'> & { password: string };
export type CommentAuth = Pick<CommentType, 'comment' | 'rating'> & Pick<OfferType, 'id'>

