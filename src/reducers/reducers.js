import {
  LOAD_DOGS_IN_PROGRESS,
  LOAD_DOGS_SUCCESS,
  LOAD_DOGS_FAILURE,
  ADD_DOG,
  EDIT_DOG,
  REMOVE_DOG, LOAD_TITLES_SUCCESS,
} from '../actions/actions';

export const dogs = (state = [], action) => {
  const {type, payload} = action;
  switch (type) {
    case LOAD_DOGS_SUCCESS: {
      const {dogs} = payload;
      return {dogs: dogs};
    }
    case ADD_DOG: {
      const {dog} = payload;
      return {
        ...state,
        dogs: state.dogs.concat(dog)}
    }
    case EDIT_DOG: {
      const {dog} = payload;
      return {
        ...state,
        dogs: state.dogs.map(stateDog => {
          if (stateDog.id === dog.id) {
            return dog;
          }
          return stateDog;
        })
      }
    }
    case REMOVE_DOG: {
      const {id} = payload;
      return {dogs: state.dogs.filter(dog => dog.id !== id)};
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
    case LOAD_TITLES_SUCCESS: {
      const {titles} = payload;
      return {titles: titles};
    }
    default:
      return state;
  }
};
