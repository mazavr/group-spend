import {actionTypes} from './actionTypes';

export function setView(view) {
  return {type: actionTypes.SET_VIEW, view};
}

export function setSelectedUserId(id) {
  return {type: actionTypes.SET_SELECTED_USER_ID, id};
}

export function setSelectedSessionId(id) {
  return {type: actionTypes.SET_SELECTED_SESSION_ID, id};
}

export function setSelectedSessionEventId(id) {
  return {type: actionTypes.SET_SELECTED_SESSION_EVENT_ID, id};
}
