import { AppState } from '../RootReducer';
import { createSelector } from 'reselect';

import { Title } from './TitleTypes';

const getTitles = (state: AppState): Title[] | undefined =>
    state.titles.titles ? state.titles.titles.data : undefined;

const getSelectedTitle = (state: AppState): Title | undefined =>
    state.titles.selectedTitle ? state.titles.selectedTitle : undefined;

export const getTitlesSelector = createSelector(getTitles, (titles: Title[] | undefined) => titles);

export const getSelectedTitleSelector = createSelector(
    getSelectedTitle,
    (selectedTitle: Title | undefined) => selectedTitle,
);
