import {actionTypes} from './actionTypes';

export function createSession(session) {
  return {type: actionTypes.CREATE_SESSION, session};
}

export function updateSession(session) {
  return {type: actionTypes.UPDATE_SESSION, session};
}

export function updateSessions(sessions) {
  return {type: actionTypes.UPDATE_SESSIONS, sessions};
}

export function deleteSession(id) {
  return {type: actionTypes.DELETE_SESSION, id};
}

export function openSessionEvent(sessionId, event) {
  return {type: actionTypes.OPEN_SESSION_EVENT, sessionId, event};
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

export function updateSessionEvents(sessionId, events) {
  return {type: actionTypes.UPDATE_SESSION_EVENTS, sessionId, events};
}

export function deleteSessionEvent(sessionId, eventId) {
  return {type: actionTypes.DELETE_SESSION_EVENT, sessionId, eventId};
}
