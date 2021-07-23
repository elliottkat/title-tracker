export const LOAD_DOGS_IN_PROGRESS = 'LOAD_DOGS_IN_PROGRESS';
export const LOAD_DOGS_SUCCESS = 'LOAD_DOGS_SUCCESS';
export const LOAD_DOGS_FAILURE = 'LOAD_DOGS_FAILURE';
export const ADD_DOG = 'ADD_DOG';
export const REMOVE_DOG = 'REMOVE_DOG';

export const getDogsLoading = state => {
  const {isLoading} = state;
  console.log('getDogsLoading: isLoading', isLoading);
  return isLoading;
};

// Action creators
export const loadDogsSuccess = dogs => {
  return {
    type: LOAD_DOGS_SUCCESS,
    payload: {dogs}
  };
};

export const loadDogsInProgress = () => ({
  type: LOAD_DOGS_IN_PROGRESS
});

export const loadDogsFailure = () => ({
  type: LOAD_DOGS_FAILURE
});

export const addDog = dog => {
  return {
    type: ADD_DOG,
    payload: {dog}
  };
};

export const removeDog = id => {
  return {
    type: REMOVE_DOG,
    payload: {id}
  };
};
