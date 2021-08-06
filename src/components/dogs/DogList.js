import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import '../../scss/DogList.scss';

import DogTableHeader from './DogTableHeader';
import DogTableBody from './DogTableBody';

import {loadDogs, addDogRequest, editDogRequest, removeDogRequest} from '../../thunks/thunks';
import {loadDogsSuccess} from '../../actions/actions';

const DogList = (props) => {
  const { dogs } = props.dogs;
  useEffect(() => {
    const fetchDogs = async () => {
      const response = await fetch('http://localhost:8080/api/dogs', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      console.log(json);
      setDogs(json);
      dispatch(loadDogsSuccess(json));
    }
    fetchDogs();
  }, []);

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
