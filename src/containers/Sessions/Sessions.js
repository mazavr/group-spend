import React, {useContext} from 'react';
import {globalContext} from '../../store/globalReducer';
import SessionForm from '../SessionForm';
import SessionsEditableList from '../SessionsEditableList';
import SessionEventForm from '../SessionEventForm';

function Sessions() {
  const [{selectedSessionId, selectedSessionEventId}] = useContext(globalContext);

  if (selectedSessionEventId) {
    return <SessionEventForm/>
  } else if (selectedSessionId) {
    return <SessionForm/>
  }

  return <SessionsEditableList/>
}

export default Sessions
