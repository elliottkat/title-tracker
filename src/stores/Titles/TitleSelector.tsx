import { AppState } from '../RootReducer';
import { createSelector } from 'reselect';

import { Title } from './TitleTypes';

const getTitles = (state: AppState): Title[] | undefined =>
    state.titles.titles ? state.titles.titles.data : undefined;

export const getTitlesSelector = createSelector(getTitles, (titles: Title[] | undefined) => titles);
