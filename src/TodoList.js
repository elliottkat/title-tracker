import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  getTodosLoading,
  getCompletedTodos,
  getIncompleteTodos
} from './selectors';

import {
  loadTodos,
  removeTodoRequest,
  markTodoAsCompletedRequest,
  markTodoAsInProgressRequest
} from './thunks';

import './TodoList.css';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';

const TodoList = ({completedTodos, incompleteTodos, onRemovePressed, onCompletedPressed, onInProgressPressed, isLoading, startLoadingTodos}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
  const loadingMessage = <div>Loading Todos...</div>;
  const content = (
    <div className='list-wrapper'>
      <NewTodoForm/>
      <h3>Incomplete:</h3>
      {incompleteTodos.map(todo => <TodoListItem
        todo={todo}
        onRemovePressed={onRemovePressed}
        onCompletedPressed={onCompletedPressed}
        onInProgressPressed={onInProgressPressed}/>)}
      <h3>Completed:</h3>
      {completedTodos.map(todo => <TodoListItem
        todo={todo}
        onRemovePressed={onRemovePressed}
        onCompletedPressed={onCompletedPressed}
        onInProgressPressed={onInProgressPressed}/>)}
    </div>
  );
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state)
});

const mapDispatchToProps = dispatch => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: id => dispatch(removeTodoRequest(id)),
  onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
  onInProgressPressed: id => dispatch(markTodoAsInProgressRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
