import React from 'react';
import {observer} from 'mobx-react';
import SessionForm from '../SessionForm';
import SessionsEditableList from '../SessionsEditableList';
import SessionEventForm from '../SessionEventForm';
import {useStore} from '../../App/AppContext';

export default observer(function Sessions() {
  const {shellStore} = useStore();

  if (shellStore.selectedSessionEventId) {
    return <SessionEventForm event={shellStore.selectedSessionEvent}/>
  }

  if (shellStore.selectedSessionId) {
    return <SessionForm session={shellStore.selectedSession}/>
  }

  return <SessionsEditableList/>
})
