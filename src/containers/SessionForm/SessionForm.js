import React from 'react';
import {setSelectedSessionId, updateSession as updateSessionAction} from '../../store/globalActions';
import EventList from '../EventList';
import SessionTitleForm from '../SessionTitleForm';
import SessionMoneyTransferPanel from '../SessionMoneyTransferPanel';

function SessionForm({selectedSessionId, sessions, dispatch, users}) {
  const session = sessions.find(session => session.id === selectedSessionId);

  const cancelEdit = () => {
    dispatch(setSelectedSessionId(null))
  };

  const saveTitle = title => {
    dispatch(updateSessionAction({...session, title}));
    dispatch(setSelectedSessionId(null));
  };

  return (
    <div className={'v-list'}>
      <div className={'v-list__item'}>
        <h5>Edit session</h5>
      </div>
      <div className={'v-list__item'}>
        <SessionTitleForm session={session}
                          sessions={sessions}
                          onSave={saveTitle}
                          onCancel={cancelEdit}/>
      </div>
      <div className={'v-list__item v-list__item--4xgap'}>
        <EventList session={session}
                   dispatch={dispatch}/>
      </div>
      <div className={'v-list__item  v-list__item--4xgap'}>
        <SessionMoneyTransferPanel session={session}
                                   users={users}
                                   dispatch={dispatch}/>
      </div>
    </div>
  )
}

export default React.memo(SessionForm);
