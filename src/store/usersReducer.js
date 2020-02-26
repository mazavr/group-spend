import {actionTypes} from './actionTypes';
import {deleteObjectFromArray, updateObjectInArray} from './reducerUtilities';

function sortUsersByName(user1, user2) {
  if (user1.name < user2.name) {
    return -1;
  }
  if (user1.name > user2.name) {
    return 1;
  }
  return 0;
}

export function usersReducer(usersState = [], action) {
  switch (action.type) {
    case actionTypes.CREATE_USER:
      return usersState.concat(action.user).sort(sortUsersByName);
    case actionTypes.UPDATE_USER:
      return updateObjectInArray(usersState, action.user);
    case actionTypes.DELETE_USER:
      return deleteObjectFromArray(usersState, action.id);
    default:
      return usersState;
  }
}
