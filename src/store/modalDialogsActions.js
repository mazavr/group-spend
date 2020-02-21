import {actionTypes} from './actionTypes';

export function showDialog(dialog) {
  return {type: actionTypes.SHOW_DIALOG, dialog}
}

export function hideDialog() {
  return {type: actionTypes.HIDE_DIALOG}
}
