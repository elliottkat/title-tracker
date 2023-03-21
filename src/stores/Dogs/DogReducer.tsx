import { AnyAction } from 'redux';

import {
    FETCH_DOGS_REQUEST,
    FETCH_DOGS_SUCCESS,
    FETCH_DOGS_FAILURE,
    ADD_DOG_REQUEST,
    ADD_DOG_SUCCESS,
    ADD_DOG_FAILURE,
    REMOVE_DOG_REQUEST,
    REMOVE_DOG_SUCCESS,
    REMOVE_DOG_FAILURE,
    EDIT_DOG_REQUEST,
    EDIT_DOG_SUCCESS,
    EDIT_DOG_FAILURE,
} from './DogActionTypes';
import { DogState } from './DogTypes';

export const initialState: DogState = {
    allDogs: {
        error: null,
        pending: false,
        data: [],
    },
};

export const DogReducer = (state = initialState, action: AnyAction): DogState => {
    switch (action.type) {
        case FETCH_DOGS_REQUEST: {
            return {
                ...state,
                allDogs: { data: undefined, error: null, pending: true },
            };
        }
        case FETCH_DOGS_SUCCESS: {
            return {
                ...state,
                allDogs: {
                    ...state.allDogs,
                    error: null,
                    pending: false,
                    data: action.payload.data,
                },
            };
        }
        case FETCH_DOGS_FAILURE: {
            return {
                ...state,
                allDogs: {
                    ...state.allDogs,
                    error: action.payload ?? 'Unknown error',
                    pending: false,
                    data: undefined,
                },
            };
        }
        case ADD_DOG_REQUEST: {
            return {
                ...state,
                allDogs: {
                    ...state.allDogs,
                    error: null,
                    pending: true,
                    data: state.allDogs.data,
                },
            };
        }
        case ADD_DOG_SUCCESS: {
            return {
                ...state,
                allDogs: {
                    ...state.allDogs,
                    error: null,
                    pending: false,
                    data: state.allDogs.data?.concat(action.payload.data),
                },
            };
        }
        case ADD_DOG_FAILURE: {
            return {
                ...state,
                allDogs: {
                    ...state.allDogs,
                    error: action.payload ?? 'Unknown error',
                    pending: false,
                    data: state.allDogs.data,
                },
            };
        }
        case EDIT_DOG_REQUEST: {
            return {
                ...state,
                allDogs: {
                    ...state.allDogs,
                    error: null,
                    pending: true,
                    data: state.allDogs.data,
                },
            };
        }
        case EDIT_DOG_SUCCESS: {
            const newStateData = state.allDogs.data?.map((dog) => {
                if (dog.id === action.payload.data.id) {
                    return action.payload.data;
                }
                return dog;
            });
            return {
                ...state,
                allDogs: {
                    ...state.allDogs,
                    error: null,
                    pending: false,
                    data: newStateData,
                },
            };
        }
        case EDIT_DOG_FAILURE: {
            return {
                ...state,
                allDogs: {
                    ...state.allDogs,
                    error: action.payload ?? 'Unknown error',
                    pending: false,
                    data: state.allDogs.data,
                },
            };
        }
        case REMOVE_DOG_REQUEST: {
            return {
                ...state,
                allDogs: {
                    ...state.allDogs,
                    error: null,
                    pending: true,
                    data: state.allDogs.data,
                },
            };
        }
        case REMOVE_DOG_SUCCESS: {
            const newStateData = state.allDogs.data?.filter((dog) => dog.id !== action.payload.data);
            return {
                ...state,
                allDogs: {
                    ...state.allDogs,
                    error: null,
                    pending: false,
                    data: newStateData,
                },
            };
        }
        case REMOVE_DOG_FAILURE: {
            return {
                ...state,
                allDogs: {
                    ...state.allDogs,
                    error: action.payload ?? 'Unknown error',
                    pending: false,
                    data: state.allDogs.data,
                },
            };
        }
        default:
            return state;
    }
};
