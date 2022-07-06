import './App.css';

import { Configure, InstantSearch } from 'react-instantsearch-dom';
import React, { useEffect, useRef, useState } from 'react';

import { AppDataProvider } from './context/appData/AppDataProvider';
import algoliaInsights from 'search-insights';
import algoliasearch from 'algoliasearch';
import { hot } from 'react-hot-loader/root';

const App = props => {
  const { algolia } = props.appData;
  const [algoliaSearchState, setAlgoliaSearchState] = useState({});
  const [algoliaConfig, setAlgoliaConfig] = useState();
  const searchClient =
    algolia && useRef(algoliasearch(algolia.appId, algolia.APIKey));
  const indexName =
    algolia && algolia.environment
      ? `${algolia.environment}_plieger_nl`
      : 'p1_plieger_nl';

  useEffect(() => {
    const url = window.location.href;

    if (url.includes('search/') || url.includes('/c/'))
      setAlgoliaConfig({
        indexName,
        searchClient: searchClient.current,
        algoliaInsights,
      });
  }, []);

  return (
    <AppDataProvider appData={props.appData} algoliaConfig={algoliaConfig}>
      <InstantSearch
        searchClient={searchClient.current}
        indexName={indexName}
        searchState={algoliaSearchState}
        onSearchStateChange={searchState => setAlgoliaSearchState(searchState)}
      >
        {/* exposes the queryId that is used for algoliaInsights */}
        <Configure clickAnalytics />
        <div className="container">{props.children}</div>
      </InstantSearch>
    </AppDataProvider>
  );
};

export default hot(App);
