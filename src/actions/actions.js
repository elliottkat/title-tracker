export const LOAD_DOGS_SUCCESS = 'LOAD_DOGS_SUCCESS';
export const LOAD_DOGS_FAILURE = 'LOAD_DOGS_FAILURE';
export const EDIT_DOG = 'EDIT_DOG';
export const ADD_DOG = 'ADD_DOG';
export const REMOVE_DOG = 'REMOVE_DOG';
export const LOAD_TITLES_SUCCESS = 'LOAD_TITLES_SUCCESS';
export const ADD_TITLE = 'ADD_TITLE';

// Action creators
export const loadDogsSuccess = dogs => {
  return {
    type: LOAD_DOGS_SUCCESS,
    payload: {dogs}
  };
};

export const loadDogsFailure = () => ({
  type: LOAD_DOGS_FAILURE
});

export const addDog = dog => {
  return {
    type: ADD_DOG,
    payload: {dog}
  };
};

export const editDog = dog => {
  return {
    type: EDIT_DOG,
    payload: {dog}
  };
};

export const removeDog = dog => {
  return {
    type: REMOVE_DOG,
    payload: {dog}
  };
};

export const loadTitlesSuccess = titles => {
  return {
    type: LOAD_TITLES_SUCCESS,
    payload: {titles}
  };
};

export const addTitle = title => {
  return {
    type: ADD_TITLE,
    payload: {title}
  };
};
