import { combineReducers } from 'redux';
import { GET_NOTES_SUCCESS, ADD_NOTE_SUCCESS } from '../actions';

const notes = (oldState = [], action) => {
  switch (action.type) {
    case GET_NOTES_SUCCESS:
      return action.notes;
    case ADD_NOTE_SUCCESS:
      return [action.note].concat(oldState);
    default:
      return oldState;
  }
};

const rootReducer = combineReducers({
  notes,
});

export default rootReducer;
