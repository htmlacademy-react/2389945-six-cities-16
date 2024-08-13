import { CityType, RateType, SortNameType, OfferInfoType } from './lib/types';

export const DEFAULT_MARKER_URL =
  '../public/img/pin.svg';

export const CURRENT_MARKER_URL =
  '../public/img/pin-active.svg';

export const OffersSettings = {
  offersCount: 5,
  starsCount: 5,
  reviewText: { minLength: 50, maxLength: 300 },
};

/*
export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id',
};
*/

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '/404'
}

export enum ApiRoute {
  Offers = '/offers',
  Login = '/login',
  Comments = '/comments',
  Favorite = '/favorite'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CityInfo: CityType[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  },
];

export const CityList = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const RateSettings: RateType[] = [
  {
    name: 'perfect',
    mark: 5,
  },
  {
    name: 'good',
    mark: 4,
  },
  {
    name: 'not bad',
    mark: 3,
  },
  {
    name: 'badly',
    mark: 2,
  },
  {
    name: 'terribly',
    mark: 1,
  },
];

export enum SortingList {
  Popular = 'Popular',
  PriceIncrease = 'Price: low to high',
  PriceDecrease = 'Price: high to low',
  TopRated = 'Top rated first',
}

export const CompareSortValues: {
  [key in SortNameType]: (valueOne: OfferInfoType, valueTwo: OfferInfoType) => number
} = {
  Popular: () => 0,
  PriceIncrease: (valueOne, valueTwo) => valueOne.price - valueTwo.price,
  PriceDecrease: (valueOne, valueTwo) => valueTwo.price - valueOne.price,
  TopRated: (valueOne, valueTwo) => valueTwo.rating - valueOne.rating,
};

export enum HttpCode {
  NotFound = 404
}


