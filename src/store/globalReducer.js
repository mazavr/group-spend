import {createContext} from 'react';
import {actionTypes} from './globalActions';
import viewNames from "../constants/viewNames";

export const globalContext = createContext(null);

export const globalState = {
  users: [],
  sessions: [],
  view: viewNames.SESSIONS,
  selectedSession: null,
  selectedUser: null,
  selectedSessionEvent: null
};

export const globalReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: action.users
      };
    case actionTypes.SET_SESSIONS:
      return {
        ...state,
        sessions: action.sessions
      };
    case actionTypes.SET_SELECTED_SESSION:
      return {
        ...state,
        selectedSession: action.session
      };
    case actionTypes.SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.user
      };
    case actionTypes.SET_VIEW:
      return {
        ...state,
        view: action.view
      };
    case actionTypes.SET_SELECTED_SESSION_EVENT:
      return {
        ...state,
        selectedSessionEvent: action.event
      };
    default:
      throw new Error('Unknown reducer action');
  }
};

export const init = initState => {
  return {
    ...globalState,
    ...initState
  }
};
