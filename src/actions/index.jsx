/*
 * action types
 */
export const GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS';
export const GET_NOTES_FAILD = 'GET_NOTES_FAILD';
export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS';

/*
 * action creators
 */
export function addNoteSuccess(res) {
  return { type: ADD_NOTE_SUCCESS, note: res.obj };
}

export function getNotesSuccess(res) {
  return {
    type: GET_NOTES_SUCCESS,
    notes: res.obj,
  };
}
