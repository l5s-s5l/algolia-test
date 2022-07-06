/* eslint-disable react/prop-types */
import '../../App.css';

import React, { useEffect, useRef } from 'react';

import { connectSearchBox } from 'react-instantsearch-dom';

function SearchBox({ refine }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
      refine(query);
    }
  }, []);

  const clickHandler = () => {
    if (inputRef.current.value) {
      window.location = `/search?q=${inputRef.current.value}`;
    }
  };

  return (
    <div>
      <input ref={inputRef} className="searchbox" />
      <button onClick={clickHandler}>Search</button>
      <button onClick={() => (window.location = '/')}>Clear</button>
    </div>
  );
}

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
