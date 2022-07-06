import '../../App.css';

import React, { useRef } from 'react';

import { connectHits } from 'react-instantsearch-dom';

function Hits() {
  const inputRef = useRef(null);

  const clickHandler = () => {
    if (inputRef.current.value) {
      window.location = `/search?${inputRef.current.value}`;
    }
  };

  return (
    <div>
      <input ref={inputRef} className="searchbox" />
      <button onClick={clickHandler}>Search</button>
    </div>
  );
}

const CustomHits = connectHits(Hits);

export default CustomHits;
