import { Icon, layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { CityType, OfferInfoType } from '../../lib/types';
import { useMap } from '../../hooks/use-map';
import { DEFAULT_MARKER_URL, CURRENT_MARKER_URL } from '../../const';

type MapProps = {
  city: CityType | null;
  offers: OfferInfoType[];
  currentOffer?: OfferInfoType | null;
  place?: 'cities' | 'offer';
};

type IconOptionsType = {
  iconsSize: [number, number];
  iconAnchor: [number, number];
};
const defaultIconOptions: IconOptionsType = {
  iconsSize: [40, 40],
  iconAnchor: [20, 40],
};

const defaultCustomIcon = new Icon({
  iconUrl: DEFAULT_MARKER_URL,
  ...defaultIconOptions,
});

const currentCustomIcon = new Icon({
  iconUrl: CURRENT_MARKER_URL,
  ...defaultIconOptions,
});

export const Map = (props: MapProps): JSX.Element => {
  const { city, offers, currentOffer, place = 'cities' } = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map && city) {
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            currentOffer !== undefined && offer.title === currentOffer?.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, currentOffer]);

  return <section className={`${place}__map map`} ref={mapRef}></section>;
};
