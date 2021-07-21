import {
  createTodo,
  loadTodosInProgress,
  loadTodosSuccess,
  loadTodosFailure,
  removeTodo,
  markTodoAsCompleted,
  markTodoAsInProgress
} from './actions/actions';

export const displayAlert = text => () => {
  alert(text);
};

export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadTodosInProgress());
    const response = await fetch('http://localhost:8081/todos');
    const todos = await response.json();

    dispatch(loadTodosSuccess(todos));
  } catch (error) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert(error));
  }
};

export const addTodoRequest = text => async dispatch => {
  try {
    const body = JSON.stringify({text});
    const response = await fetch('http://localhost:8081/todos', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body
    });
    const todo = await response.json();
    dispatch(createTodo(todo));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const removeTodoRequest = id => async dispatch => {
  try {
    const response = await fetch(`http://localhost:8081/todos/${id}`, {
      method: 'delete'
    });
    const removedTodo = await response.json();
    dispatch(removeTodo(removedTodo));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const markTodoAsCompletedRequest = id => async dispatch => {
  try {
    const response = await fetch(`http://localhost:8081/todos/${id}/completed`,{
      method: 'post'
    });
    const updatedTodo = await response.json();
    dispatch(markTodoAsCompleted(updatedTodo));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const markTodoAsInProgressRequest = id => async dispatch => {
  try {
    const response = await fetch(`http://localhost:8081/todos/${id}/in-progress`,{
      method: 'post'
    });
    const updatedTodo = await response.json();
    dispatch(markTodoAsInProgress(updatedTodo));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};
