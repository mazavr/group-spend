export const actionTypes = {
  SET_VIEW: 'SET_VIEW',
  CREATE_USER: 'CREATE_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SET_SELECTED_USER_ID: 'SET_SELECTED_USER_ID',
  CREATE_SESSION: 'CREATE_SESSION',
  UPDATE_SESSION: 'UPDATE_SESSION',
  DELETE_SESSION: 'DELETE_SESSION',
  SET_SELECTED_SESSION_ID: 'SET_SELECTED_SESSION_ID',
  CLOSE_SESSION: 'CLOSE_SESSION',
  CREATE_SESSION_EVENT: 'CREATE_SESSION_EVENT',
  UPDATE_SESSION_EVENT: 'UPDATE_SESSION_EVENT',
  DELETE_SESSION_EVENT: 'DELETE_SESSION_EVENT',
  SET_SELECTED_SESSION_EVENT_ID: 'SET_SELECTED_SESSION_EVENT_ID',
  SHOW_DIALOG: 'SHOW_DIALOG',
  HIDE_DIALOG: 'HIDE_DIALOG',
};

export function setView(view) {
  return {type: actionTypes.SET_VIEW, view};
}

export function createUser(user) {
  return {type: actionTypes.CREATE_USER, user};
}

export function updateUser(user) {
  return {type: actionTypes.UPDATE_USER, user};
}

export function deleteUser(id) {
  return {type: actionTypes.DELETE_USER, id};
}

export function setSelectedUserId(id) {
  return {type: actionTypes.SET_SELECTED_USER_ID, id};
}

export function createSession(session) {
  return {type: actionTypes.CREATE_SESSION, session};
}

export function updateSession(session) {
  return {type: actionTypes.UPDATE_SESSION, session};
}

export function deleteSession(id) {
  return {type: actionTypes.DELETE_SESSION, id};
}

export function setSelectedSessionId(id) {
  return {type: actionTypes.SET_SELECTED_SESSION_ID, id};
}

export function closeSession(id) {
  return {type: actionTypes.CLOSE_SESSION, id};
}

export function createSessionEvent(sessionId, event) {
  return {type: actionTypes.CREATE_SESSION_EVENT, sessionId, event};
}

export function updateSessionEvent(sessionId, event) {
  return {type: actionTypes.UPDATE_SESSION_EVENT, sessionId, event};
}

export function deleteSessionEvent(sessionId, eventId) {
  return {type: actionTypes.DELETE_SESSION_EVENT, sessionId, eventId};
}

export function setSelectedSessionEventId(id) {
  return {type: actionTypes.SET_SELECTED_SESSION_EVENT_ID, id};
}

export function showDialog(dialog) {
  return {type: actionTypes.SHOW_DIALOG, dialog}
}

export function hideDialog() {
  return {type: actionTypes.HIDE_DIALOG}
}
