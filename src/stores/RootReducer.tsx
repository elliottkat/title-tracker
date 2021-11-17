import { combineReducers } from 'redux';

import { DogReducer } from './Dogs/DogReducer';
import {TitleReducer} from './Titles/TitleReducer';

const RootReducer = combineReducers({
    dogs: DogReducer,
    titles: TitleReducer,
});

export type AppState = ReturnType<typeof RootReducer>;

export default RootReducer;
