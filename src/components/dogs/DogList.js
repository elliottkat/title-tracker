import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {getDogsLoading} from '../../actions/actions';
import {loadDogs, editDogRequest, removeDogRequest} from '../../thunks/thunks';
import DogTableHeader from './DogTableHeader';
import DogTableBody from './DogTableBody';

const DogList = ({dogs, isLoading, startLoadingDogs, onEditPressed, onRemovePressed}) => {
  const dogsToLoad = dogs.dogs || dogs;
  useEffect(() => {
    startLoadingDogs();
  }, []);

  const loadingMessage = (
    <div>Loading Dogs...</div>
  );

  const content = (
    <div
      id="dog-table-grid"
      role="grid"
      aria-label="Dogs"
      className="dog-table"
    >
      <DogTableHeader />
      <DogTableBody dogs={dogsToLoad} onEditPressed={onEditPressed} onRemovePressed={onRemovePressed} />
    </div>
  )

  return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
  dogs: state.dogs,
  isLoading: getDogsLoading(state)
});

const mapDispatchToProps = dispatch => ({
  startLoadingDogs: () => dispatch(loadDogs()),
  onEditPressed: dog => dispatch(editDogRequest(dog)),
  onRemovePressed: id => dispatch(removeDogRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DogList);
