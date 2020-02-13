import {createContext} from 'react';
import {actionTypes} from './globalActions';
import viewNames from '../constants/viewNames';

export const globalContext = createContext(null);

export const globalState = {
  users: [],
  sessions: [],
  view: viewNames.SESSIONS,
  selectedSession: null,
  selectedSessionId: null,
  selectedSessionEvent: null,
  selectedSessionEventId: null,
  selectedUser: null,
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
  switch (action.type) {
    case actionTypes.CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.user]
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => user.id === action.user.id ? {...user, ...action.user} : user)
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    case actionTypes.CREATE_SESSION:
      return {
        ...state,
        sessions: [...state.sessions, action.session]
      };
    case actionTypes.UPDATE_SESSION:
      return {
        ...state,
        sessions: state.sessions.map(session => session.id === action.session.id ? {...session, ...action.session} : session)
      };
    case actionTypes.CLOSE_SESSION:
      return {
        ...state,
        sessions: state.sessions.map(session => {
          return session.id === action.id
            ? {
              ...session,
              closed: true,
              events: session.events.map(event => ({...event, closed: true}))
            }
            : session;
        })
      };
    case actionTypes.DELETE_SESSION:
      return {
        ...state,
        sessions: state.sessions.filter(session => session.id !== action.id)
      };
    case actionTypes.SET_SELECTED_SESSION_ID:
      return {
        ...state,
        selectedSessionId: action.id
      };
    case actionTypes.CREATE_SESSION_EVENT:
      return {
        ...state,
        sessions: state.sessions.map(session => {
          return session.id === action.sessionId
            ? {...session, events: [...session.events, action.event], closed: false}
            : session;
        })
      };
    case actionTypes.SET_SELECTED_USER_ID:
      return {
        ...state,
        selectedUserId: action.id
      };
    case actionTypes.SET_VIEW:
      return {
        ...state,
        view: action.view
      };
    case actionTypes.SET_SELECTED_SESSION_EVENT_ID:
      return {
        ...state,
        selectedSessionEventId: action.id
      };
    case actionTypes.DELETE_SESSION_EVENT:
      return {
        ...state,
        sessions: state.sessions.map(session => {
          return session.id === action.sessionId
            ? {...session, events: session.events.filter(event => event.id !== action.eventId)}
            : session;
        })
      };
    case actionTypes.UPDATE_SESSION_EVENT:
      return {
        ...state,
        sessions: state.sessions.map(session => {
          return session.id === action.sessionId
            ? {
              ...session,
              events: session.events.map(event => {
                return event.id === action.event.id
                  ? {...event, ...action.event}
                  : event;
              })
            }
            : session;
        })
      };
    case actionTypes.SHOW_DIALOG:
      return {
        ...state,
        modalDialogs: [...state.modalDialogs, action.dialog]
      };
    case actionTypes.HIDE_DIALOG:
      return {
        ...state,
        modalDialogs: state.modalDialogs.slice(0, state.modalDialogs.length - 1)
      };
    default:
      throw new Error('Unknown reducer action');
  }
};
