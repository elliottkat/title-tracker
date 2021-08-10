import {
  LOAD_DOGS_SUCCESS,
  LOAD_DOGS_FAILURE,
  ADD_DOG,
  EDIT_DOG,
  REMOVE_DOG
} from '../actions/actions';

export const dogs = (state = [], action) => {
  const {type, payload} = action;
  switch (type) {
    case LOAD_DOGS_SUCCESS: {
      const {dogs} = payload;
      return {dogs};
    }
    case ADD_DOG: {
      const {dog} = payload;
      const dogs = [...state.dogs.concat(dog)];
      return {dogs};
    }
    case EDIT_DOG: {
      const {dog} = payload;
      const dogs = [
        ...state.dogs.map(stateDog => {
          if (stateDog.id === dog.id) {
            return dog;
          }
          return stateDog;
        })
      ]
      return {dogs};
    }
    case REMOVE_DOG: {
      const {dog} = payload;
      const dogs = [
        ...state.dogs.filter(allDogs => allDogs.id !== dog.id)
      ]
      return {dogs};
    }
    case LOAD_DOGS_FAILURE:
      return state;
    default:
      return state;
  }
};
