import localStorageNames from '../constants/localStorageNames';

const getPersistedSessions = () => {
  return JSON.parse(localStorage.getItem(localStorageNames.SESSIONS)) || [];
};

const persistSessions = sessions => {
  return localStorage.setItem(localStorageNames.SESSIONS, JSON.stringify(sessions));
};

export default {
  getPersistedSessions,
  persistSessions
}
