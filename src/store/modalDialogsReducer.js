import {actionTypes} from './actionTypes';

export function modalDialogsReducer(modalDialogsState = [], action) {
  switch (action.type) {
    case actionTypes.SHOW_DIALOG:
      return modalDialogsState.concat(action.dialog);
    case actionTypes.HIDE_DIALOG:
      return modalDialogsState.slice(0, modalDialogsState.length - 1);
    default:
      return modalDialogsState;
  }
}
