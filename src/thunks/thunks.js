import {
  addDog,
  editDog,
  removeDog,
  loadDogsSuccess,
  loadDogsFailure,
  loadTitlesSuccess,
  addTitle
} from '../actions/actions';

export const displayAlert = text => () => {
  alert(text);
};

export const loadDogs = () => async dispatch => {
  try {
    const response = await fetch('http://localhost:8080/api/dogs');
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
    const response = await fetch('http://localhost:8080/api/dogs', {
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
    const response = await fetch(`http://localhost:8080/api/dogs/${dog.id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body
    });
    const editedDog = await response.json();
    dispatch(editDog(dog));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const removeDogRequest = dog => async dispatch => {
  const { id } = dog;
  try {
    const response = await fetch(`http://localhost:8080/api/dogs/${id}`, {
      method: 'DELETE'
    });
    const removedDog = await response.json();
    console.log('removedDog:', removedDog);
    dispatch(removeDog(dog));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const loadAllTitles = () => async dispatch => {
  try {
    const response = await fetch('http://localhost:8080/api/titles');
    const titles = await response.json();
    dispatch(loadTitlesSuccess(titles));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const loadTitles = id => async dispatch => {
  try {
    const body = {dogId: id};
    const response = await fetch(`http://localhost:8080/api/titles/${id}`, {
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

export const addEditTitleRequest = title => async dispatch => {
  try {
    const body = JSON.stringify(title);
    const response = await fetch('http://localhost:8080/api/titles', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body
    });
    const addedTitle = await response.json();
    dispatch(addTitle(addedTitle));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};
