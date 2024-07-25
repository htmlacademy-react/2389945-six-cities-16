export type TOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type AppProps = {
  offersCount: number;
  offers: TOffer[];
};

export type PlaceCardProps =
  TOffer & {
    onMouseMove?: (id: string) => void;
    onMouseLeave?: () => void;
    place?: 'cities' | 'favorites';
  };


export type PlaceCardListProps = {
  offers: TOffer[];
};

export type FavoritesProps = {
  offers: TOffer[];
}


