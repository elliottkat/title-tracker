import { AppState } from '../RootReducer';
import { createSelector } from 'reselect';

import {Dog} from './DogTypes';

const getDogs = (state: AppState): Dog[] | undefined =>
    state.dogs.allDogs ? state.dogs.allDogs.data : undefined;


export const getDogsSelector = createSelector(
    getDogs,
    (dogs: Dog[] | undefined) => dogs,
);
