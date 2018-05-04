import { combineReducers } from 'redux';
import { GET_NOTES_SUCCESS, GET_NOTES_FAILD } from '../actions';

const notes = (oldState = [], action) => {
  switch (action.type) {
    case GET_NOTES_SUCCESS:
      return action.notes;
    case GET_NOTES_FAILD:
    default:
      return oldState;
  }
};

const rootReducer = combineReducers({
  notes,
});

export default rootReducer;
