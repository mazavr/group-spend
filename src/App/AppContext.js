import React, {useRef} from 'react';
import {autorun} from 'mobx';
import {createStore} from '../stores/GlobalStore';
import UsersService from '../services/UsersService';
import SessionsService from '../services/SessionsService';

const storeContext = React.createContext(null);

export const useStore = () => {
  return React.useContext(storeContext);
};

export function AppProvider({children}) {
  const store = useRef(createStore({
    users: UsersService.getPersistedUsers(),
    sessions: SessionsService.getPersistedSessions()
  })).current;

  autorun(() => UsersService.persistUsers(store.userStore.users), {name: 'Persist users'});

  autorun(() => SessionsService.persistSessions(store.sessionStore.sessions), {name: 'Persist sessions'});

  return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
}
