import {
  addDog,
  editDog,
  removeDog,
  loadDogsSuccess,
  loadDogsFailure, loadTitlesSuccess
} from '../actions/actions';

export const displayAlert = text => () => {
  alert(text);
};

export const loadDogs = () => async dispatch => {
  try {
    const response = await fetch('http://localhost:8080/dogs');
    const dogs = await response.json();
    dispatch(loadDogsSuccess(dogs));
  } catch (error) {
    dispatch(loadDogsFailure());
    dispatch(displayAlert(error));
  }
};

export const addDogRequest = dog => async dispatch => {
  try {
    const body = JSON.stringify(dog);
    const response = await fetch('http://localhost:8080/dogs', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body
    });
    const addedDog = await response.json();
    dispatch(addDog(addedDog));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const editDogRequest = dog => async dispatch => {
  try {
    const body = JSON.stringify(dog);
    const response = await fetch(`http://localhost:8080/dogs/${dog.id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body
    });
    const editedDog = await response.json();
    dispatch(editDog(editedDog));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const removeDogRequest = id => async dispatch => {
  try {
    const response = await fetch(`http://localhost:8080/dogs/${id}`, {
      method: 'DELETE'
    });
    const removedDog = await response.json();
    console.log('removedDog:', removedDog);
    dispatch(removeDog(removedDog.id));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const loadAllTitles = () => async dispatch => {
  try {
    const response = await fetch('http://localhost:8080/titles');
    const titles = await response.json();
    dispatch(loadTitlesSuccess(titles));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const loadTitles = id => async dispatch => {
  try {
    const body = {dogId: id};
    const response = await fetch(`http://localhost:8080/titles/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body
    });
    const loadedTitles = await response.json();
    dispatch(loadTitlesSuccess(loadedTitles));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};
