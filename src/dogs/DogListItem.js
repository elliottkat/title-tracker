import React from 'react';
import './TodoListItem.css';

const DogListItem = ({ dog }) => (
  <div className="todo-item-container">
    <h3>Dog: {dog.name}</h3>
    <div className="buttons-container">
      <button className="completed-button">Mark As Completed</button>
      <button className="remove-button">Remove</button>
    </div>
  </div>
);

export default DogListItem;