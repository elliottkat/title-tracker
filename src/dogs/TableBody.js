import React from 'react';
// import { useDispatch } from 'react-redux';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import DogListItem from './DogListItem';

const TableBody = ({ dogs, onEditPressed, onRemovePressed }) => {
  // const dispatch = useDispatch();
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

TableBody.propTypes = {
  dogs: PropTypes.object.isRequired
};

export default TableBody;
