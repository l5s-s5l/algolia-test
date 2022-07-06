/* eslint-disable react/prop-types */
import { Hits, connectStats } from 'react-instantsearch-dom';
import React, { useEffect, useState } from 'react';

import CustomPagination from '../Pagination/PaginationContainer';
import SearchHeading from '../SearchHeading/SearchHeading';

function ProductOverviewWithAlgolia(props) {
  const { nbHits } = props;
  const [mockSearchPage, setMockSearchPage] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) setMockSearchPage(true);
  }, []);

  return mockSearchPage ? (
    <>
      <CustomPagination numberOfHits={nbHits} />
      <SearchHeading />
      <div className="search-panel">
        <div className="search-panel__results">
          <Hits hitComponent={Hit} />
          <CustomPagination numberOfHits={nbHits} />
        </div>
      </div>
    </>
  ) : null;
}

function Hit(props) {
  const { hit } = props;

  return (
    <article className="hit-container">
      <h2>{hit.combinedNameSearch}</h2>
      <img
        className="product-image"
        src={
          hit.picture ||
          'https://plieger.nl/_ui/responsive/common/images/plieger-no-product.png'
        }
      />
    </article>
  );
}

const ProductOverview = connectStats(ProductOverviewWithAlgolia);

export default ProductOverview;
