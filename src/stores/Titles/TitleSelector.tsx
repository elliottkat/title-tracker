import { AppState } from '../RootReducer';
import { createSelector } from 'reselect';

import { Title } from './TitleTypes';

const getTitles = (state: AppState): Title[] | undefined =>
    state.titles.allTitles ? state.titles.allTitles.data : undefined;

export const getTitlesSelector = createSelector(getTitles, (dogs: Title[] | undefined) => dogs);
