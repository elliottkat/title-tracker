import React from 'react';

import './DogListItem.scss';

const DogListItem = ({ dog, onRemovePressed }) => (
  <div key={dog.name} className="dog-item-container">
    <h3 align='left'>{dog.name}</h3>
    <p align='left'>{dog.id}</p>
    <div key={dog.name} className="buttons-container">
      <button
        className="remove-button"
        onClick={() => onRemovePressed(dog.id)}>Remove</button>
    </div>
  </div>
);

export default DogListItem;
