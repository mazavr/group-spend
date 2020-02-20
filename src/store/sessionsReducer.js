import {actionTypes} from './globalActions';
import {deleteObjectFromArray, updateObject, updateObjectInArray} from './reducerUtilities';

export function sessionsReducer(sessionsState = [], action) {
  switch (action.type) {
    case actionTypes.CREATE_SESSION:
      return sessionsState.concat(action.session);
    case actionTypes.UPDATE_SESSION:
      return updateObjectInArray(sessionsState, action.session);
    case actionTypes.CLOSE_SESSION:
      return updateObjectInArray(sessionsState, {id: action.id}, session => {
        return updateObject(session, {
          closed: true,
          events: session.events.map(event => updateObject(event, {closed: true}))
        })
      });
    case actionTypes.DELETE_SESSION:
      return deleteObjectFromArray(sessionsState, action.id);
    case actionTypes.CREATE_SESSION_EVENT:
      return updateObjectInArray(sessionsState, {id: action.sessionId}, session => {
        return updateObject(session, {events: session.events.concat(action.event)})
      });
    case actionTypes.DELETE_SESSION_EVENT:
      return updateObjectInArray(sessionsState, {id: action.sessionId}, session => {
        return updateObject(session, {events: deleteObjectFromArray(session.events, action.eventId)});
      });
    case actionTypes.UPDATE_SESSION_EVENT:
      return updateObjectInArray(sessionsState, {id: action.sessionId}, session => {
        return updateObject(session, {events: updateObjectInArray(session.events, action.event)});
      });
    case actionTypes.OPEN_SESSION_EVENT:
      return updateObjectInArray(sessionsState, {id: action.sessionId}, session => {
        return updateObject(session, {
          closed: false,
          events: updateObjectInArray(session.events, action.event, event => {
            return updateObject(event, action.event, {closed: false})
          })
        })
      });
    default:
      return sessionsState;
  }
}
