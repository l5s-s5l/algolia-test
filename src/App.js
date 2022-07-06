import './App.css';

import React, { useEffect } from 'react';

import placeComponents from './place-components';

// import { useLocalStorage } from './helpers/useLocalStorage';

function App() {
  useEffect(() => {
    placeComponents();
  }, []);

  return (
    <div className="container">
      <div
        id="PliegerApp"
        data-react-json={`{
          "algolia":	{
            "APIKey": "135c954e3af430b567540d64b62f2734",
            "appId": "BV3K998NIV",
            "environment": "laurens"
          }
			  }`}
      ></div>
      <div data-react-entry="CustomSearchBox"> </div>
      <div data-react-entry="CurrentRefinements"> </div>
      <div data-react-entry="ProductOverview"> </div>
    </div>
  );
}

export default App;
