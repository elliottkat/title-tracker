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
    allTitles: {
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
                allTitles: { data: undefined, error: null, pending: true },
            };
        }
        case FETCH_TITLES_SUCCESS: {
            return {
                ...state,
                allTitles: {
                    ...state.allTitles,
                    error: null,
                    pending: false,
                    data: action.payload.data,
                },
            };
        }
        case FETCH_TITLES_FAILURE: {
            return {
                ...state,
                allTitles: {
                    ...state.allTitles,
                    error: action.payload ?? 'Unknown error',
                    pending: false,
                    data: undefined,
                },
            };
        }
        case ADD_TITLE_REQUEST: {
            return {
                ...state,
                allTitles: {
                    ...state.allTitles,
                    error: null,
                    pending: true,
                    data: state.allTitles.data,
                },
            };
        }
        case ADD_TITLE_SUCCESS: {
            return {
                ...state,
                allTitles: {
                    ...state.allTitles,
                    error: null,
                    pending: false,
                    data: state.allTitles.data?.concat(action.payload.data),
                },
            };
        }
        case ADD_TITLE_FAILURE: {
            return {
                ...state,
                allTitles: {
                    ...state.allTitles,
                    error: action.payload ?? 'Unknown error',
                    pending: false,
                    data: state.allTitles.data,
                },
            };
        }
        case EDIT_TITLE_REQUEST: {
            return {
                ...state,
                allTitles: {
                    ...state.allTitles,
                    error: null,
                    pending: true,
                    data: state.allTitles.data,
                },
            };
        }
        case EDIT_TITLE_SUCCESS: {
            const newStateData = state.allTitles.data?.map((dog) => {
                if (dog.id === action.payload.data.id) {
                    return action.payload.data;
                }
                return dog;
            });
            return {
                ...state,
                allTitles: {
                    ...state.allTitles,
                    error: null,
                    pending: false,
                    data: newStateData,
                },
            };
        }
        case EDIT_TITLE_FAILURE: {
            return {
                ...state,
                allTitles: {
                    ...state.allTitles,
                    error: action.payload ?? 'Unknown error',
                    pending: false,
                    data: state.allTitles.data,
                },
            };
        }
        case REMOVE_TITLE_REQUEST: {
            return {
                ...state,
                allTitles: {
                    ...state.allTitles,
                    error: null,
                    pending: true,
                    data: state.allTitles.data,
                },
            };
        }
        case REMOVE_TITLE_SUCCESS: {
            const newStateData = state.allTitles.data?.filter((dog) => dog.id !== action.payload.data);
            return {
                ...state,
                allTitles: {
                    ...state.allTitles,
                    error: null,
                    pending: false,
                    data: newStateData,
                },
            };
        }
        case REMOVE_TITLE_FAILURE: {
            return {
                ...state,
                allTitles: {
                    ...state.allTitles,
                    error: action.payload ?? 'Unknown error',
                    pending: false,
                    data: state.allTitles.data,
                },
            };
        }
        default:
            return state;
    }
};
