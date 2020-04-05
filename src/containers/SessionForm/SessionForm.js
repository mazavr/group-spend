import React from 'react';
import {observer} from 'mobx-react';
import EventList from '../EventList';
import SessionTitleForm from '../SessionTitleForm';
import SessionMoneyTransferPanel from '../SessionMoneyTransferPanel';
import {useStore} from '../../App/AppContext';

export default observer(function SessionForm({session}) {
  const {sessionStore, userStore, shellStore} = useStore();

  const cancelEdit = () => {
    shellStore.setSelectedSessionId(null);
  };

  const saveTitle = title => {
    session.setTitle(title);
    shellStore.setSelectedSessionId(null);
  };

  return (
    <div className={'v-list'}>
      <div className={'v-list__item'}>
        <h5>Edit session</h5>
      </div>
      <div className={'v-list__item'}>
        <SessionTitleForm session={session}
                          sessions={sessionStore.sessions}
                          onSave={saveTitle}
                          onCancel={cancelEdit}/>
      </div>
      <div className={'v-list__item v-list__item--4xgap'}>
        <EventList session={session}/>
      </div>
      <div className={'v-list__item  v-list__item--4xgap'}>
        <SessionMoneyTransferPanel session={session}
                                   users={userStore.users}/>
      </div>
    </div>
  )
});
