import {actionTypes} from './actionTypes';

export function createUser(user) {
  return {type: actionTypes.CREATE_USER, user};
}

export function updateUser(user) {
  return {type: actionTypes.UPDATE_USER, user};
}

export function deleteUser(id) {
  return {type: actionTypes.DELETE_USER, id};
}
