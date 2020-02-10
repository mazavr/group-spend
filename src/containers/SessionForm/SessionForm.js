import React, {useContext, useMemo} from 'react';
import {globalContext} from '../../store/globalReducer';
import {
  closeSession as closeSessionAction,
  setSelectedSessionId,
  updateSession as updateSessionAction
} from '../../store/globalActions';
import EventList from '../EventList/EventList';
import SessionTitleForm from '../SessionTitleForm';
import SessionMoneyTransferPanel from '../SessionMoneyTransferPanel';

function SessionForm() {
  const [{selectedSessionId, sessions}, dispatch] = useContext(globalContext);
  const originalSession = useMemo(() => {
    return sessions.find(session => session.id === selectedSessionId);
  }, [sessions, selectedSessionId]);

  const cancelEdit = () => {
    dispatch(setSelectedSessionId(null))
  };

  const closeSession = () => {
    dispatch(closeSessionAction(selectedSessionId));
  };

  const openSession = () => {
    dispatch(updateSessionAction({...originalSession, closed: false}));
  };

  const saveTitle = title => {
    dispatch(updateSessionAction({...originalSession, title}));
    dispatch(setSelectedSessionId(null));
  };

  return (
    <div className={'v-list'}>
      <div className={'v-list__item'}>
        <h5>Edit session</h5>
      </div>
      <div className={'v-list__item'}>
        <SessionTitleForm session={originalSession}
                          onSave={saveTitle}
                          onCancel={cancelEdit}/>
      </div>
      <div className={'v-list__item v-list__item--4xgap'}>
        <EventList session={originalSession}/>
      </div>
      <div className={'v-list__item  v-list__item--4xgap'}>
        <SessionMoneyTransferPanel session={originalSession}
                                   onCloseSession={closeSession}
                                   onOpenSession={openSession}/>
      </div>
    </div>
  )
}

export default SessionForm;
