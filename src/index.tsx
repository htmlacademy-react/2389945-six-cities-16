import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { OffersSettings } from './const';
import { OFFERS } from './mocks/offers';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offersCount={OffersSettings.offersCount} offers={OFFERS} />
    </Provider>
  </React.StrictMode>
);
