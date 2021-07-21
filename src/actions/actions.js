export const FETCH_DOGS_SUCCESS = 'FETCH_DOGS_SUCCESS';
export const CREATE_TODO = 'CREATE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const MARK_TODO_AS_COMPLETED = 'MARK_TODO_AS_COMPLETED';
export const MARK_TODO_AS_IN_PROGRESS = 'MARK_TODO_AS_IN_PROGRESS';
export const LOAD_TODOS_IN_PROGRESS = 'LOAD_TODOS_IN_PROGRESS';
export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';

export function fetchDogsSuccess(data) {
  return { type: FETCH_DOGS_SUCCESS, payload: data};
}

// Action creators
export const createTodo = todo => ({
  type: CREATE_TODO,
  payload: {todo}
});

export const removeTodo = todo => ({
  type: REMOVE_TODO,
  payload: {todo}
});

export const markTodoAsCompleted = todo => ({
  type: MARK_TODO_AS_COMPLETED,
  payload: {todo}
});

export const markTodoAsInProgress = todo => ({
  type: MARK_TODO_AS_IN_PROGRESS,
  payload: {todo}
});

export const loadTodosInProgress = () => ({
  type: LOAD_TODOS_IN_PROGRESS
})

export const loadTodosSuccess = todos => ({
  type: LOAD_TODOS_SUCCESS,
  payload: {todos}
})

export const loadTodosFailure = () => ({
  type: LOAD_TODOS_FAILURE
})
