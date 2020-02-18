import React, {useEffect, useReducer} from 'react';
import BaseNavigation from '../containers/BaseNavigation';
import {globalReducer, init, globalContext} from '../store/globalReducer';
import Sessions from '../containers/Sessions';
import Users from '../containers/Users';
import viewNames from '../constants/viewNames';
import UsersService from '../services/UsersService';
import SessionsService from '../services/SessionsService';
import ModalDialogList from '../containers/ModalDialogList';

function App() {
  const [store, dispatch] = useReducer(globalReducer, {
    users: UsersService.getPersistedUsers(),
    sessions: SessionsService.getPersistedSessions()
  }, init);

  useEffect(() => {
    UsersService.persistUsers(store.users)
  }, [store.users]);

  useEffect(() => {
    SessionsService.persistSessions(store.sessions)
  }, [store.sessions]);

  return (
    <globalContext.Provider value={[store, dispatch]}>
      <div className="v-list">
        <div className={'v-list__item'}>
          <BaseNavigation view={store.view} dispatch={dispatch} selectedSessionEventId={store.selectedSessionEventId}/>
        </div>
        <div className={`v-list__item ${store.view === viewNames.USERS ? '' : 'display--none'}`}>
          <Users/>
        </div>
        <div className={`v-list__item ${store.view === viewNames.SESSIONS ? '' : 'display--none'}`}>
          <Sessions/>
        </div>
      </div>
      <ModalDialogList dispatch={dispatch} modalDialogs={store.modalDialogs}/>
    </globalContext.Provider>
  )
}

export default App;
