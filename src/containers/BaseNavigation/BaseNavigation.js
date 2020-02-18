import React from 'react';
import './styles.scss'
import {
  setSelectedSessionEventId,
  setSelectedSessionId,
  setSelectedUserId, setView
} from '../../store/globalActions';
import viewNames from '../../constants/viewNames';

const nav = [{id: viewNames.SESSIONS, title: 'Sessions'}, {id: viewNames.USERS, title: 'Friends'}];

function BaseNavigation({view, selectedSessionEventId, dispatch}) {
  const navClick = newView => {
    if (newView === view) {
      if (view === viewNames.SESSIONS && selectedSessionEventId) {
        dispatch(setSelectedSessionEventId(null));
      } else if (view === viewNames.SESSIONS) {
        dispatch(setSelectedSessionId(null));
      } else if (view === viewNames.USERS) {
        dispatch(setSelectedUserId(null));
      }
    }

    dispatch(setView(newView));
  };

  return (
    <div className={'base-nav'}>
      {nav.map(item =>
        <button type={'button'} key={item.id}
                className={`base-nav__item ${view === item.id ? 'base-nav__item--active' : ''}`}
                onClick={() => navClick(item.id)}>
          {item.title}
        </button>
      )}
    </div>
  )
}

export default React.memo(BaseNavigation);
