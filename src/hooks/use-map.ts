import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { CityType } from '../lib/types';

export const useMap = (
  mapRef: MutableRefObject<HTMLElement | null>,
  city: CityType | null
): Map | null => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (city && mapRef.current !== null && !isRenderedRef.current) {
      const handler = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      );

      handler.addLayer(layer);
      setMap(handler);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
};
