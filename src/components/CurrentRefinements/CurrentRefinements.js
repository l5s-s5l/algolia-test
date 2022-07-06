/* eslint-disable no-console */

import React from 'react';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

function refinements() {
  return <div>test</div>;
}

const CurrentRefinements = connectCurrentRefinements(refinements);

export default CurrentRefinements;
