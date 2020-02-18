import React from 'react';
import {
  closeSession as closeSessionAction,
  setSelectedSessionId, showDialog,
  updateSession as updateSessionAction
} from '../../store/globalActions';
import EventList from '../EventList';
import SessionTitleForm from '../SessionTitleForm';
import SessionMoneyTransferPanel from '../SessionMoneyTransferPanel';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';

function SessionForm({selectedSessionId, sessions, dispatch, users}) {
  const originalSession = sessions.find(session => session.id === selectedSessionId);

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
                          sessions={sessions}
                          onSave={saveTitle}
                          onCancel={cancelEdit}/>
      </div>
      <div className={'v-list__item v-list__item--4xgap'}>
        <EventList session={originalSession}
                   dispatch={dispatch}/>
      </div>
      <div className={'v-list__item  v-list__item--4xgap'}>
        <SessionMoneyTransferPanel session={originalSession}
                                   users={users}
                                   onCloseSession={closeSession}
                                   onOpenSession={openSession}/>
      </div>
    </div>
  )
}

export default React.memo(SessionForm);
