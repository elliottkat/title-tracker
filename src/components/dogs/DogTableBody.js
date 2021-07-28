import React from 'react';
import PropTypes from 'prop-types';

import DogListItem from './DogListItem';

const DogTableBody = (props) => {
  return (
    <table
      id="dog-table-body"
      role="presentation"
      className="table table--body"
    >
      <tbody>
      {props.dogs.map(dog => <DogListItem
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
