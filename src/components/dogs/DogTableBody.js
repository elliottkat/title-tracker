import React from 'react';
import PropTypes from 'prop-types';

import DogListItem from './DogListItem';

const DogTableBody = (props) => {
  const dogs = props.dogs.dogs || [];
  return (
    <table
      id="dog-table-body"
      role="presentation"
      className="table table--body"
    >
      <tbody>
      {dogs.map(dog => <DogListItem
        dog={dog}
        onEditPressed={props.onEditPressed}
        onRemovePressed={props.onRemovePressed} />)}
      </tbody>
    </table>
  );
};

DogTableBody.propTypes = {
  dogs: PropTypes.array.isRequired
};

export default DogTableBody;
