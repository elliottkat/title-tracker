import {
  addDog,
  editDog,
  removeDog,
  loadDogsSuccess,
  loadDogsFailure,
  loadTitlesSuccess,
  addTitle, editTitle, removeTitle
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
    if (response.status === 200) {
      const addedDog = await response.json();
      dispatch(addDog(addedDog));
    } else {
      displayAlert(`Add dog failed with ${response.statusMessage}`);
    }
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
    if (response.status === 200) {
      dispatch(editDog(dog));
    } else {
      displayAlert(`Dog edit failed with ${response.statusMessage}`);
    }
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
    if (response.status === 200) {
      dispatch(removeDog(dog));
    } else {
      displayAlert(`Remove dog failed with ${response.statusMessage}`)
    }
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
    const response = await fetch(`http://localhost:8080/api/titles?dogId=${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const titles = await response.json();
    dispatch(loadTitlesSuccess(titles));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const addTitleRequest = title => async dispatch => {
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

export const editTitleRequest = title => async dispatch => {
  try {
    const body = JSON.stringify(title);
    const response = await fetch('http://localhost:8080/api/titles', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body
    });
    const editedTitle = await response.json();
    dispatch(editTitle(editedTitle));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const removeTitleRequest = title => async dispatch => {
  const { id } = title;
  try {
    const response = await fetch(`http://localhost:8080/api/titles/${id}`, {
      method: 'DELETE'
    });
    if (response.status === 200) {
      dispatch(removeTitle(title));
    } else {
      displayAlert(`Remove dog failed with ${response.statusMessage}`)
    }
  } catch (error) {
    dispatch(displayAlert(error));
  }
};
