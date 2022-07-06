import { Configure, InstantSearch } from 'react-instantsearch-dom';
import React, { useEffect, useState } from 'react';

import { AppDataProvider } from '../../context/appData/AppDataProvider';
import algoliaInsights from 'search-insights';
import algoliasearch from 'algoliasearch';
import { hot } from 'react-hot-loader/root';

const Main = props => {
  const { algolia } = props.appData;
  const [algoliaSearchState, setAlgoliaSearchState] = useState({});
  const [algoliaConfig, setAlgoliaConfig] = useState();
  const searchClient = algolia && algoliasearch(algolia.appId, algolia.APIKey);
  const indexName =
    algolia && algolia.environment
      ? `${algolia.environment}_plieger_nl`
      : 'p1_plieger_nl';

  useEffect(() => {
    const url = window.location.href;

    if (url.includes('search/') || url.includes('/c/'))
      setAlgoliaConfig({ indexName, searchClient, algoliaInsights });
  }, []);

  return (
    <AppDataProvider appData={props.appData} algoliaConfig={algoliaConfig}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName}
        searchState={algoliaSearchState}
        onSearchStateChange={searchState => {
          if (
            Object.keys(searchState).length &&
            JSON.stringify(searchState) !== JSON.stringify(algoliaSearchState)
          )
            setAlgoliaSearchState(searchState);
        }}
      >
        {/* exposes the queryId that is used for algoliaInsights */}
        <Configure clickAnalytics />
        {props.children}
      </InstantSearch>
    </AppDataProvider>
  );
};

export default hot(Main);
