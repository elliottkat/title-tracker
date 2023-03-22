import { AnyAction } from 'redux';

import {
    FETCH_TITLES_REQUEST,
    FETCH_TITLES_SUCCESS,
    FETCH_TITLES_FAILURE,
    ADD_TITLE_REQUEST,
    ADD_TITLE_SUCCESS,
    ADD_TITLE_FAILURE,
    REMOVE_TITLE_REQUEST,
    REMOVE_TITLE_SUCCESS,
    REMOVE_TITLE_FAILURE,
    EDIT_TITLE_REQUEST,
    EDIT_TITLE_SUCCESS,
    EDIT_TITLE_FAILURE,
} from './TitleActionTypes';
import { TitleState } from './TitleTypes';

export const initialState: TitleState = {
    titles: {
        error: null,
        pending: false,
        data: [],
    },
};

export const TitleReducer = (state = initialState, action: AnyAction): TitleState => {
    switch (action.type) {
        case FETCH_TITLES_REQUEST: {
            return {
                ...state,
                titles: { data: undefined, error: null, pending: true },
            };
        }
        case FETCH_TITLES_SUCCESS: {
            return {
                ...state,
                titles: {
                    error: null,
                    pending: false,
                    data: action.payload.data,
                },
            };
        }
        case FETCH_TITLES_FAILURE: {
            return {
                ...state,
                titles: {
                    error: action.payload ?? 'Unknown error',
                    pending: false,
                    data: undefined,
                },
            };
        }
        case ADD_TITLE_REQUEST: {
            return {
                ...state,
                titles: {
                    error: null,
                    pending: true,
                    data: [],
                },
            };
        }
        case ADD_TITLE_SUCCESS: {
            return {
                ...state,
                titles: {
                    ...state.titles,
                    error: null,
                    pending: false,
                    data: state.titles.data?.concat(action.payload.data),
                },
            };
        }
        case ADD_TITLE_FAILURE: {
            return {
                ...state,
                titles: {
                    ...state.titles,
                    error: action.payload ?? 'Unknown error',
                    pending: false,
                    data: state.titles.data,
                },
            };
        }
        case EDIT_TITLE_REQUEST: {
            return {
                ...state,
                titles: {
                    ...state.titles,
                    error: null,
                    pending: true,
                    data: state.titles.data,
                },
            };
        }
        case EDIT_TITLE_SUCCESS: {
            const newStateData = state.titles.data?.map((dog) => {
                if (dog.id === action.payload.data.id) {
                    return action.payload.data;
                }
                return dog;
            });
            return {
                ...state,
                titles: {
                    ...state.titles,
                    error: null,
                    pending: false,
                    data: newStateData,
                },
            };
        }
        case EDIT_TITLE_FAILURE: {
            return {
                ...state,
                titles: {
                    ...state.titles,
                    error: action.payload ?? 'Unknown error',
                    pending: false,
                    data: state.titles.data,
                },
            };
        }
        case REMOVE_TITLE_REQUEST: {
            return {
                ...state,
                titles: {
                    ...state.titles,
                    error: null,
                    pending: true,
                    data: state.titles.data,
                },
            };
        }
        case REMOVE_TITLE_SUCCESS: {
            const newStateData = state.titles.data?.filter((dog) => dog.id !== action.payload.data);
            return {
                ...state,
                titles: {
                    ...state.titles,
                    error: null,
                    pending: false,
                    data: newStateData,
                },
            };
        }
        case REMOVE_TITLE_FAILURE: {
            return {
                ...state,
                titles: {
                    ...state.titles,
                    error: action.payload ?? 'Unknown error',
                    pending: false,
                    data: state.titles.data,
                },
            };
        }
        default:
            return state;
    }
};
