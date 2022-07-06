/* eslint-disable react/prop-types */
import { Hits, connectStats } from 'react-instantsearch-dom';

import CustomPagination from '../Pagination/PaginationContainer';
import React from 'react';
import SearchHeading from '../SearchHeading/SearchHeading';

function ProductOverviewWithAlgolia(props) {
  const { nbHits } = props;

  return (
    <>
      {/* <Configure page={4} /> */}
      <CustomPagination numberOfHits={nbHits} />
      <SearchHeading />
      <div className="search-panel">
        {/* <div className="search-panel__filters">
              <Configure facets={['*']} maxValuesPerFacet={20} />
              <DynamicWidgets fallbackWidget={RefinementList}></DynamicWidgets>
            </div> */}

        <div className="search-panel__results">
          <Hits hitComponent={Hit} />
          <CustomPagination numberOfHits={nbHits} />
        </div>
      </div>
    </>
  );
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
