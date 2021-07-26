import React from 'react';
import PropTypes from 'prop-types';

// import { useDispatch } from 'react-redux';
// import ReactDOM from 'react-dom';
import DogListItem from './DogListItem';

const DogTableBody = ({ dogs, onEditPressed, onRemovePressed }) => {
  return (
    <table
      id="dog-table-body"
      role="presentation"
      className="table table--body"
    >
      <tbody>
      {dogs.map(dog => <DogListItem onEditPressed={onEditPressed} onRemovePressed={onRemovePressed} dog={dog} />)}
      </tbody>
    </table>
  );
};

DogTableBody.propTypes = {
  dogs: PropTypes.object.isRequired
};

export default DogTableBody;
