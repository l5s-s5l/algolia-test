import '../../App.css';

import Pagination from './Pagination';
import React from 'react';
import { connectPagination } from 'react-instantsearch-dom';

function PaginationContainer(props) {
  const { currentRefinement, nbPages, refine, totalNumberOfResults } = props;

  const pagination = {
    pageSize: 20,
    searchText: 0,
    currentPage: currentRefinement - 1,
    sort: 'relevance',
    numberOfPages: nbPages,
    totalNumberOfResults,
    paginationUrl: '',
  };

  return (
    <div className="pagination">
      <Pagination
        pagination={pagination}
        onNextClick={() => {
          const page = currentRefinement + 1;
          refine(page);
        }}
        onPageSelect={pageNumber => {
          const page = pageNumber + 1;
          refine(page);
        }}
        onPrevClick={() => {
          const page = currentRefinement - 1;
          refine(page);
        }}
      />
    </div>
  );
}

const CustomPagination = connectPagination(PaginationContainer);

export default CustomPagination;
