import { AppDataContext } from './AppDataContext';
import React from 'react';

export function AppDataProvider(props) {
  const store = {
    appData: {
      ...props.appData,
      algolia: { ...props.appData.algolia, ...props.algoliaConfig },
    } || {
      pickupDayOffsets: '',
      deliveryDayOffsets: '',
      userIsLoggedIn: false,
      userCanAddToCart: false,
    },
  };

  return (
    <AppDataContext.Provider value={store} {...props}>
      {props.children}
    </AppDataContext.Provider>
  );
}
