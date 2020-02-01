import React, {useContext} from 'react';
import {globalContext} from '../../store/globalReducer';
import SessionForm from '../SessionForm';
import SessionsEditableList from '../SessionsEditableList';
import SessionEventForm from '../SessionEventForm';

function Sessions() {
  const [{selectedSession, selectedSessionEvent}] = useContext(globalContext);

  if (selectedSessionEvent) {
    return <SessionEventForm/>
  } else if (selectedSession) {
    return <SessionForm/>
  }

  return <SessionsEditableList/>
}

export default Sessions
