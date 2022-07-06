import 'whatwg-fetch';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

function getDataFromTag(element) {
  const jsonString = element.getAttribute('data-react-json');

  if (jsonString) {
    return JSON.parse(jsonString);
  }
  return {};
}

const createElement = (component, htmlElement, index) => {
  const props = getDataFromTag(htmlElement);
  const Element = component.default || component;

  return <Element {...props} key={index} />;
};

// eslint-disable-next-line require-await
async function getElements() {
  const htmlElements = [...document.querySelectorAll('[data-react-entry]')];
  let component;

  return Promise.all(
    // eslint-disable-next-line consistent-return
    htmlElements.map(async htmlElement => {
      const index = htmlElement.getAttribute('data-react-entry');
      switch (index) {
        case 'CustomSearchBox':
          component = await import(
            /* webpackChunkName: "CustomSearchBox"*/ './components/SearchBox/SearchBox'
          );
          return createElement(component, htmlElement, index, true);
        case 'CurrentRefinements':
          component = await import(
            /* webpackChunkName: "CurrentRefinements"*/ './components/CurrentRefinements/CurrentRefinements'
          );
          return createElement(component, htmlElement, index, true);
        case 'ProductOverview':
          component = await import(
            /* webpackChunkName: "ProductOverview"*/ './components/ProductOverview/ProductOverview'
          );
          return createElement(component, htmlElement, index, true);
        default:
          break;
      }
    })
  );
}

const placeComponents = async () => {
  const children = await getElements();

  const appComponent = document.getElementById('PliegerApp');
  const appData = getDataFromTag(appComponent);

  ReactDOM.render(<App appData={appData}>{children}</App>, appComponent);
};

export default placeComponents;
