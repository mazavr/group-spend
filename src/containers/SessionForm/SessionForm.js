import React, {useContext,  useState} from 'react';
import {globalContext} from '../../store/globalReducer';
import {actionTypes} from '../../store/globalActions';
import SessionsService from '../../services/SessionsService';
import EventList from '../EventList/EventList';

function SessionForm() {
  const [{selectedSession}, dispatch] = useContext(globalContext);
  const [sessionTitle, setSessionTitle] = useState(selectedSession.title);

  const cancel = () => {
    dispatch({type: actionTypes.SET_SELECTED_SESSION, session: null})
  };

  const saveSessionTitle = () => {
    SessionsService.updateSession(selectedSession.id, {...selectedSession, title: sessionTitle}).then(() => {
      SessionsService.querySessions().then(sessions => {
        dispatch({type: actionTypes.SET_SESSIONS, sessions});
        dispatch({type: actionTypes.SET_SELECTED_SESSION, session: null})
      })
    })
  };

  const onSessionTitleChange = title => {
    setSessionTitle(title)
  };

  return (
    <div className={'v-list'}>
      <div className={'v-list__item'}>
        <h4>
          Edit session
        </h4>
      </div>
      <div className={'v-list__item'}>
        <input className={'base-input'} value={sessionTitle}
               onChange={event => onSessionTitleChange(event.target.value)}/>
      </div>
      <div className={'v-list__item'}>
        <div className={'h-list h-list--pull-right'}>
          <div className={'h-list__item'}>
            <button type={'button'} className={'base-button base-button--success'} onClick={saveSessionTitle}>
              Save name
            </button>
          </div>
        </div>
      </div>
      <div className={'v-list__item v-list__item--4xgap'}>
        <EventList session={selectedSession}/>
      </div>
      <div className={'v-list__item  v-list__item--4xgap'}>
        <div className={'h-list h-list--pull-right'}>
          <div className={'h-list__item'}>
            <button type={'button'} className={'base-button base-button--light'} onClick={cancel}>Back</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionForm
