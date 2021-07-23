import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {getDogsLoading} from './actions';
import {loadDogs, removeDogRequest} from './thunks';
import DogListHeader from './DogListHeader';
import TableBody from './TableBody';

const DogList = ({dogs, isLoading, startLoadingDogs, onRemovePressed}) => {
  const dogsToLoad = dogs.dogs || dogs;
  useEffect(() => {
    startLoadingDogs();
  }, []);

  const loadingMessage = (
    <div>Loading Dogs...</div>
  );

  const content = (
    <div
      id="player-table-grid"
      role="grid"
      aria-label="Poker Players"
      className="player-table"
    >
      <DogListHeader />
      <TableBody dogs={dogsToLoad} onRemovePressed={onRemovePressed} />
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
  onRemovePressed: id => dispatch(removeDogRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DogList);
