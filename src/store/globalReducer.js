import {createContext} from 'react';
import {actionTypes} from './actionTypes';
import viewNames from '../constants/viewNames';
import {updateObject} from './reducerUtilities'
import {usersReducer} from './usersReducer';
import {sessionsReducer} from './sessionsReducer';
import {modalDialogsReducer} from './modalDialogsReducer';

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
    sessions: sessionsReducer(state.sessions, action),
    modalDialogs: modalDialogsReducer(state.modalDialogs, action)
  });

  switch (action.type) {
    case actionTypes.SET_VIEW:
      return updateObject(state, {view: action.view});
    case actionTypes.SET_SELECTED_SESSION_ID:
      return updateObject(state, {selectedSessionId: action.id});
    case actionTypes.SET_SELECTED_SESSION_EVENT_ID:
      return updateObject(state, {selectedSessionEventId: action.id});
    case actionTypes.SET_SELECTED_USER_ID:
      return updateObject(state, {selectedUserId: action.id});
    default:
      return state;
  }
};
