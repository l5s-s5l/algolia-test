import React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';

const SearchHeading = ({ searchResults, searchState }) =>
  searchState.query ? (
    <>
      <h3 className="c-copy--body u-margin-bottom--10">
        {searchResults && searchResults.nbHits ? searchResults.nbHits : 0}{' '}
        results
      </h3>
      <h1 className="c-heading--h2 u-margin-bottom--20">{searchState.query}</h1>
    </>
  ) : null;

const CustomSearchHeading = connectStateResults(SearchHeading);

export default CustomSearchHeading;
