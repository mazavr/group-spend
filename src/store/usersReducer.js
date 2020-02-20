import {actionTypes} from './globalActions';
import {deleteObjectFromArray, updateObjectInArray} from './reducerUtilities';

export function usersReducer(usersState = [], action) {
  switch (action.type) {
    case actionTypes.CREATE_USER:
      return usersState.concat(action.user);
    case actionTypes.UPDATE_USER:
      return updateObjectInArray(usersState, action.user);
    case actionTypes.DELETE_USER:
      return deleteObjectFromArray(usersState, action.id);
    default:
      return usersState;
  }
}
