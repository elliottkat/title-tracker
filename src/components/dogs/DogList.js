import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';

import '../../scss/DogList.scss';

import DogTableHeader from './DogTableHeader';
import DogTableBody from './DogTableBody';

import {loadDogsFailure, loadDogsSuccess} from '../../actions/actions';
import {loadDogs, addDogRequest, editDogRequest, removeDogRequest} from '../../thunks/thunks';

const DogList = (props) => {
  const [dogs, setDogs] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function fetchDogs() {
      const response = await fetch('http://localhost:8080/dogs', {
        headers: {
          Accept: 'application/json'
        },
      });

      if (response.status === 200) {
        const json = await response.json();
        dispatch(loadDogsSuccess(dogs));
        setDogs(json);
      } else {
        dispatch(loadDogsFailure());
        alert(`Loading dogs failed with ${response.status}`);
      }
    })();
  }, [dogs, dispatch]);

  return (
    <div
      id="dog-table-grid"
      role="grid"
      aria-label="Dogs"
      className="dog-table"
    >
      <DogTableHeader onAddPressed={props.onAddPressed}/>
      <DogTableBody dogs={dogs} onEditPressed={props.onEditPressed} onRemovePressed={props.onRemovePressed} />
    </div>
  )
};

const mapStateToProps = state => ({
  dogs: state.dogs,
});

const mapDispatchToProps = dispatch => ({
  startLoadingDogs: () => dispatch(loadDogs()),
  onAddPressed: dog => dispatch(addDogRequest(dog)),
  onEditPressed: dog => dispatch(editDogRequest(dog)),
  onRemovePressed: id => dispatch(removeDogRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DogList);
