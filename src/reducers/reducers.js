import {
  LOAD_DOGS_SUCCESS,
  LOAD_DOGS_FAILURE,
  ADD_DOG,
  EDIT_DOG,
  REMOVE_DOG,
  LOAD_TITLES_SUCCESS,
  ADD_TITLE
} from '../actions/actions';

export const dogs = (state = [], action) => {
  const {type, payload} = action;
  switch (type) {
    case LOAD_DOGS_SUCCESS: {
      const {dogs} = payload;
      return dogs;
    }
    case ADD_DOG: {
      const {dog} = payload;
      return [
        ...state.concat(dog)
      ];
    }
    case EDIT_DOG: {
      const {dog} = payload;
      return [
        ...state.map(stateDog => {
          if (stateDog.id === dog.id) {
            return dog;
          }
          return stateDog;
        })
      ];
    }
    case REMOVE_DOG: {
      const {dog} = payload;
      return [
        ...state.filter(allDogs => allDogs.id !== dog.id)
      ];
    }
    case LOAD_DOGS_FAILURE:
      return state;
    case LOAD_TITLES_SUCCESS: {
      const {titles} = payload;
      return titles;
    }
    case ADD_TITLE: {
      const {title} = payload;
      return [
        ...state.concat(title)
      ]
    }
    default:
      return state;
  }
};
