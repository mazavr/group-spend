import {createContext} from 'react';
import {actionTypes} from './globalActions';
import viewNames from '../constants/viewNames';
import {updateObject} from './reducerUtilities'
import {usersReducer} from './usersReducer';
import {sessionsReducer} from './sessionsReducer';

export const globalContext = createContext(null);

export const globalState = {
  users: [],
  sessions: [],
  view: viewNames.SESSIONS,
  selectedSessionId: null,
  selectedSessionEventId: null,
  selectedUserId: null,
  modalDialogs: []
};

export const init = initState => {
  return {
    ...globalState,
    ...initState
  }
};

export const globalReducer = (state, action) => {
  state = updateObject(state, {
    users: usersReducer(state.users, action),
    sessions: sessionsReducer(state.sessions, action)
  });

  switch (action.type) {
    case actionTypes.SET_SELECTED_SESSION_ID:
      return updateObject(state, {selectedSessionId: action.id});
    case actionTypes.SET_SELECTED_USER_ID:
      return updateObject(state, {selectedUserId: action.id});
    case actionTypes.SET_VIEW:
      return updateObject(state, {view: action.view});
    case actionTypes.SET_SELECTED_SESSION_EVENT_ID:
      return updateObject(state, {selectedSessionEventId: action.id});
    case actionTypes.SHOW_DIALOG:
      return updateObject(state, {modalDialogs: [...state.modalDialogs, action.dialog]});
    case actionTypes.HIDE_DIALOG:
      return updateObject(state, {modalDialogs: state.modalDialogs.slice(0, state.modalDialogs.length - 1)});
    default:
      return state;
  }
};
