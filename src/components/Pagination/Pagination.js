import React from 'react';

const Pagination = ({
  pagination,
  itemsVisible = true,
  typeLabel = 'items',
  numbersVisible = true,
  center,
  className,
  scrollToTop,
  onPageSelect,
  onNextClick,
  onPrevClick,
}) => {
  const rightButtonDisabled =
    pagination.currentPage < pagination.numberOfPages - 1 ? false : true;
  const leftButtonDisabled = pagination.currentPage > 0 ? false : true;

  const handleNextClick = () => {
    if (onNextClick) {
      onNextClick();
    }
  };

  const handlePrevClick = () => {
    if (onPrevClick) {
      onPrevClick();
    }
  };

  const handlePageNumberClick = pageNumber => {
    if (onPageSelect) {
      onPageSelect(pageNumber - 1);
    }
  };

  const calculateProdcutsMin = () =>
    pagination.currentPage * pagination.pageSize + 1;

  const calculateProdcutsMax = () =>
    Math.min(
      (pagination.currentPage + 1) * pagination.pageSize,
      pagination.totalNumberOfResults
    );

  const placeNumberOfResults = () => {
    if (
      !itemsVisible ||
      isNaN(pagination.totalNumberOfResults) ||
      isNaN(pagination.pageSize) ||
      isNaN(pagination.currentPage)
    )
      return;

    if (pagination.totalNumberOfResults <= pagination.pageSize)
      return (
        <p className="c-pagination__number-of-results">
          <span className="u-font-weight--bold">
            {pagination.totalNumberOfResults}{' '}
          </span>
        </p>
      );

    return (
      <p className="c-pagination__number-of-results">
        <span className="u-font-weight--bold">
          {calculateProdcutsMin()}-{calculateProdcutsMax()}
        </span>
        {` van ${pagination.totalNumberOfResults} ${typeLabel}`}
      </p>
    );
  };

  const placePageNumber = (number, currentPage) => {
    return (
      <li>
        <button
          className="c-pagination__number-button"
          onClick={() => handlePageNumberClick(number)}
        >
          <span className="c-pagination__number">{number}</span>
        </button>
      </li>
    );
  };

  const placePageNumbers = () => {
    const { currentPage, numberOfPages } = pagination;

    return (
      <>
        {currentPage >= 3 && placePageNumber(1, currentPage)}

        {currentPage > 3 && (
          <li className="c-pagination__number-list-item">...</li>
        )}

        {currentPage > 1 && placePageNumber(currentPage - 1, currentPage)}

        {currentPage > 0 && placePageNumber(currentPage, currentPage)}

        {placePageNumber(currentPage + 1, currentPage)}

        {currentPage + 2 < numberOfPages &&
          placePageNumber(currentPage + 2, currentPage)}

        {currentPage + 3 < numberOfPages &&
          placePageNumber(currentPage + 3, currentPage)}

        {currentPage + 4 < numberOfPages && (
          <li className="c-pagination__number-list-item">...</li>
        )}

        {currentPage !== numberOfPages - 1 &&
          placePageNumber(numberOfPages, currentPage)}
      </>
    );
  };

  const placePageNavigation = () => {
    if (pagination.numberOfPages <= 1) return;

    return (
      <div className="c-pagination-container">
        <span>
          <button
            disabled={leftButtonDisabled}
            onClick={() => handlePrevClick()}
          >
            {'<'}
          </button>
        </span>
        {pagination.numberOfPages && numbersVisible ? (
          <ul className="c-pagination__list">{placePageNumbers()}</ul>
        ) : null}

        <button
          disabled={rightButtonDisabled}
          onClick={() => handleNextClick()}
        >
          {'>'}
        </button>
      </div>
    );
  };

  return (
    <div>
      {placeNumberOfResults()}
      {placePageNavigation()}
    </div>
  );
};

export default Pagination;
