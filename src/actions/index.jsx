import API from '../api';

/*
 * action types
 */
export const GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS';
export const GET_NOTES_FAILD = 'GET_NOTES_FAILD';

/*
 * action creators
 */
export function createNote(text) {
  return { type: 'CREATE_NOTE', text };
}

export function getNotesSuccess(res) {
  return {
    type: GET_NOTES_SUCCESS,
    notes: res.obj,
  };
}

export function getNotesFailed(res) {
  return {
    type: GET_NOTES_FAILD,
    errors: [res.msg],
  };
}

/**
 * async
 */
export const getNotesAsync = dispatch => API.get('/note')
  .then(res => dispatch(getNotesSuccess(res)))
  .catch(err => dispatch(getNotesFailed(err.response)));
