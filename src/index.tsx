import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { OffersSettings } from './const';
import { OFFERS } from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={OffersSettings.offersCount} offers={OFFERS} />
  </React.StrictMode>
);
