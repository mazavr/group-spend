import localStorageNames from '../constants/localStorageNames';

const getPersistedUsers = () => {
  return JSON.parse(localStorage.getItem(localStorageNames.USERS)) || [];
};

const persistUsers = users => {
  return localStorage.setItem(localStorageNames.USERS, JSON.stringify(users));
};

export default {
  getPersistedUsers,
  persistUsers
}
