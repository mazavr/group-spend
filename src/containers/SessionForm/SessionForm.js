import React, {useContext, useMemo} from 'react';
import {globalContext} from '../../store/globalReducer';
import {
  closeSession as closeSessionAction,
  setSelectedSessionId, showDialog,
  updateSession as updateSessionAction
} from '../../store/globalActions';
import EventList from '../EventList';
import SessionTitleForm from '../SessionTitleForm';
import SessionMoneyTransferPanel from '../SessionMoneyTransferPanel';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';

function SessionForm() {
  const [{selectedSessionId, sessions}, dispatch] = useContext(globalContext);
  const originalSession = useMemo(() => {
    return sessions.find(session => session.id === selectedSessionId);
  }, [sessions, selectedSessionId]);

  const cancelEdit = () => {
    dispatch(setSelectedSessionId(null))
  };

  const closeSession = () => {
    dispatch(showDialog(new ModalDialog({
      header: `Close session "${originalSession.title}"?`,
      body: 'It will close all opened session events. Operation can\'t be undone',
      type: dialogTypes.CONFIRM,
      okClick: () => dispatch(closeSessionAction(selectedSessionId))
    })))
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
