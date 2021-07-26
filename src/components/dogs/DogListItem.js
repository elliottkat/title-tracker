import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import '../../scss/DogListItem.scss';

const DogListItem = ({ dog, onEditPressed, onRemovePressed }) => (
  <div key={dog.name} className="dog-item-container">
    <h3 align='left'>{dog.name}</h3>
    <p align='left'>{dog.id}</p>
    <div key={dog.name} className="buttons-container">
      <button
        className="item-button"
        onClick={() => onEditPressed(dog)}>
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button
        className="item-button"
        onClick={() => onRemovePressed(dog.id)}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  </div>
);

export default DogListItem;
