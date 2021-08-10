import {
  LOAD_TITLES_SUCCESS,
  ADD_TITLE,
  EDIT_TITLE,
  REMOVE_TITLE
} from '../actions/actions';

export const titles = (state = [], action) => {
  const {type, payload} = action;
  switch (type) {
    case LOAD_TITLES_SUCCESS: {
      const {titles} = payload;
      return titles;
    }
    case ADD_TITLE: {
      const {title} = payload;
      return [
        ...state.concat(title)
      ]
    }
    case EDIT_TITLE: {
      const {title} = payload;
      const titles = [
        ...state.titles.map(stateTitle => {
          if (stateTitle.id === title.id) {
            return title;
          }
          return stateTitle;
        })
      ]
      return {titles};
    }
    case REMOVE_TITLE: {
      const {title} = payload;
      return [
        ...state.filter(allTitles => allTitles.id !== title.id)
      ]
    }
    default:
      return state;
  }
};
