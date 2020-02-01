import React, {useContext} from 'react';

import './styles.scss'
import {globalContext} from "../../store/globalReducer";
import {actionTypes} from "../../store/globalActions";
import viewNames from "../../constants/viewNames";

const nav = [{id: viewNames.SESSIONS, title: 'Sessions'}, {id: viewNames.USERS, title: 'Friends'}];

function BaseNavigation() {
  const [{view}, dispatch] = useContext(globalContext);

  const navClick = newView => {
    if (newView === view) {
      if (view === viewNames.SESSIONS) {
        dispatch({type: actionTypes.SET_SELECTED_SESSION, session: null});
      } else if (view === viewNames.USERS) {
        dispatch({type: actionTypes.SET_SELECTED_USER, user: null});
      }
    }

    dispatch({type: actionTypes.SET_VIEW, view: newView});
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

export default BaseNavigation
