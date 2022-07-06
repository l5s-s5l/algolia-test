import React from 'react';

export const AppDataContext = React.createContext({
  appData: {
    pickupDayOffsets: '',
    deliveryDayOffsets: '',
    userIsLoggedIn: false,
    userCanAddToCart: false,
    pdpDeliveryTimeNextDay: '',
    pdpPickupTimeNextDay: '',
    pdpPickupTimeSameDay: '',
    punchoutMode: false,
    nettProductPricesUrl: '',
  },
});

export function useAppData() {
  const context = React.useContext(AppDataContext);

  if (!context)
    throw new Error(`useAppData must be used within a AppDataProvider`);

  return context;
}
