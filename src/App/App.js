import React from 'react';
import BaseNavigation from '../containers/BaseNavigation';
import Sessions from '../containers/Sessions';
import Users from '../containers/Users';
import viewNames from '../constants/viewNames';
import ModalDialogList from '../containers/ModalDialogList';
import {useStore} from '../App/AppContext';
import {observer} from 'mobx-react';

export default observer(function App() {
  const {shellStore} = useStore();

  return (
    <>
      <div className="v-list">
        <div className={'v-list__item'}>
          <BaseNavigation/>
        </div>
        <div className={`v-list__item ${shellStore.view === viewNames.USERS ? '' : 'display--none'}`}>
          <Users/>
        </div>
        <div className={`v-list__item ${shellStore.view === viewNames.SESSIONS ? '' : 'display--none'}`}>
          <Sessions/>
        </div>
      </div>
      <ModalDialogList/>
    </>
  );
})
