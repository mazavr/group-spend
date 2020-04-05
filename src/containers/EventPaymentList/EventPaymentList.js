import React from 'react';
import {observer} from 'mobx-react';
import EventPayment from '../../components/EventPayment';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';
import SortableList from '../../components/SortableList';
import {useStore} from '../../App/AppContext';

export default observer(function EventPaymentList({event}) {
  const {userStore, modalDialogStore} = useStore();

  const onPaymentDelete = payment => {
    modalDialogStore.show(new ModalDialog({
      header: `Delete payment of user "${userStore.users.find(user => user.id === payment.userId).name}"?`,
      body: 'Operation can\'t be undone',
      type: dialogTypes.CONFIRM,
      okClick: () => event.removePayment(payment.id)
    }))
  };

  const sortPayments = (indFrom, indTo) => {
    event.movePayment(indFrom, indTo);
  };

  return <SortableList itemSelector={'.js-sortable-item'}
                       dragHelperSelector={'.js-drag-helper'}
                       disableSort={event.closed}
                       sort={sortPayments}>
    <div className={'v-list'}>
      {event.payments.map(payment =>
        <div className={'v-list__item js-sortable-item'} key={payment.id}>
          <EventPayment payment={payment}
                        deleteClick={onPaymentDelete}
                        readOnly={event.closed}/>
        </div>
      )}
    </div>
  </SortableList>
})
