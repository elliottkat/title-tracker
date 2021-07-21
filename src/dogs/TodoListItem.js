import React from 'react';
import './TodoListItem.css';

const TodoListItem = ({todo, onRemovePressed, onCompletedPressed, onInProgressPressed}) => (
  <div id={todo.text} className='todo-item-container'>
    <h3>{todo.text}</h3>
    <div id={todo.text} className='buttons-container'>
      {todo.isCompleted ?
        <button
          className='in-progress-button'
          onClick={() => onInProgressPressed(todo.id)}>Mark As In Progress</button>
        :
        <button
          className='completed-button'
          onClick={() => onCompletedPressed(todo.id)}>Mark As Completed</button>
      }
      <button
        className='remove-button'
        onClick={() => onRemovePressed(todo.id)}>Remove</button>
    </div>
  </div>
);

export default TodoListItem;
