import React from 'react';
import './styles.scss'
import viewNames from '../../constants/viewNames';
import {useStore} from '../../App/AppContext';
import {observer} from 'mobx-react';

const nav = [{id: viewNames.SESSIONS, title: 'Sessions'}, {id: viewNames.USERS, title: 'Friends'}];

export default observer(function BaseNavigation() {
  const {shellStore} = useStore();

  const navClick = newView => {
    if (newView === shellStore.view) {
      if (shellStore.view === viewNames.SESSIONS && shellStore.selectedSessionEventId) {
        shellStore.setSelectedSessionEventId(null);
      } else if (shellStore.view === viewNames.SESSIONS) {
        shellStore.setSelectedSessionId(null);
      } else if (shellStore.view === viewNames.USERS) {
        shellStore.setSelectedUserId(null);
      }
    }

    shellStore.setView(newView);
  };

  return (
    <div className={'base-nav'}>
      {nav.map(item =>
        <button type={'button'} key={item.id}
                className={`base-nav__item ${shellStore.view === item.id ? 'base-nav__item--active' : ''}`}
                onClick={() => navClick(item.id)}>
          {item.title}
        </button>
      )}
    </div>
  )
})
