import {
  LOAD_DOGS_IN_PROGRESS,
  LOAD_DOGS_SUCCESS,
  LOAD_DOGS_FAILURE,
  ADD_DOG,
  REMOVE_DOG,
} from './actions';

export const dogs = (state = [], action) => {
  const {type, payload} = action;
  switch (type) {
    case LOAD_DOGS_SUCCESS: {
      const {dogs} = payload;
      return dogs;
    }
    case ADD_DOG: {
      const {dog} = payload;
      return {
        ...state,
        dogs: state.concat(dog)}
    }
    case REMOVE_DOG: {
      const {id} = payload;
      return state.filter(dog => dog.id !== id);
    }
    case LOAD_DOGS_IN_PROGRESS: {
      return {
        isLoading: true
      }
    }
    case LOAD_DOGS_FAILURE:
      return {
        isLoading: false
      }
    default:
      return state;
  }
};
