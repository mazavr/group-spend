import React, {useContext} from 'react';
import {globalContext} from '../../store/globalReducer';
import SessionForm from '../SessionForm';
import SessionsEditableList from '../SessionsEditableList';
import SessionEventForm from '../SessionEventForm';

function Sessions() {
  const [{selectedSessionId, selectedSessionEventId, sessions, users}, dispatch] = useContext(globalContext);

  if (selectedSessionEventId) {
    return <SessionEventForm
      selectedSessionId={selectedSessionId}
      selectedSessionEventId={selectedSessionEventId}
      users={users}
      sessions={sessions}
      dispatch={dispatch}/>
  } else if (selectedSessionId) {
    return <SessionForm
      selectedSessionId={selectedSessionId}
      sessions={sessions}
      users={users}
      dispatch={dispatch}/>
  }

  return <SessionsEditableList
    sessions={sessions}
    dispatch={dispatch}/>
}

export default Sessions
