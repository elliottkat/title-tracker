import React, {useState} from 'react';
import {connect} from 'react-redux';
import {getTodosLoading} from './selectors';
import {addTodoRequest} from './thunks';

import './NewTodoForm.css';

const NewTodoForm = ({todos, onCreatePressed}) => {
  const [inputValue, setInputValue] = useState('');
  return (
    <div className='new-todo-form'>
      <input
        className='new-todo-input'
        type='text'
        placeholder='Type your new todo here'
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const isDuplicateText =
            todos.some(todo => todo.text === inputValue);
          if (!isDuplicateText) {
            onCreatePressed(inputValue);
            setInputValue('');
          }
        }}
        className='new-todo-button'>
        Create Todo
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  todos: getTodosLoading(state)
});

const mapDispatchToProps = dispatch => ({
  onCreatePressed: text => dispatch(addTodoRequest(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
