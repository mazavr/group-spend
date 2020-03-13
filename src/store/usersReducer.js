import {actionTypes} from './actionTypes';
import {deleteObjectFromArray, updateObjectInArray} from './reducerUtilities';

function sortUsersByName(user1, user2) {
  const name1 = user1.name.toLowerCase();
  const name2 = user2.name.toLowerCase();

  if (name1 < name2) {
    return -1;
  }
  if (name1 > name2) {
    return 1;
  }
  return 0;
}

export function usersReducer(usersState = [], action) {
  switch (action.type) {
    case actionTypes.CREATE_USER:
      return usersState.concat(action.user).sort(sortUsersByName);
    case actionTypes.UPDATE_USER:
      return updateObjectInArray(usersState, action.user).sort(sortUsersByName);
    case actionTypes.DELETE_USER:
      return deleteObjectFromArray(usersState, action.id);
    default:
      return usersState;
  }
}
