import React from 'react';
import EventPayment from '../../components/EventPayment';
import {showDialog} from '../../store/modalDialogsActions';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';

function EventPaymentList({event, users, eventEdit, dispatch}) {
  const onPaymentEdit = payment => {
    eventEdit({
      ...event,
      payments: event.payments.map(eventPayment => {
        return eventPayment.id === payment.id
          ? {...eventPayment, ...payment}
          : eventPayment;
      })
    });
  };

  const onPaymentDelete = payment => {
    dispatch(showDialog(new ModalDialog({
      header: `Delete payment of user "${users.find(user => user.id === payment.userId).name}"?`,
      body: 'Operation can\'t be undone',
      type: dialogTypes.CONFIRM,
      okClick: () => eventEdit({
        ...event,
        payments: event.payments.filter(eventPayment => eventPayment.id !== payment.id)
      })
    })))
  };

  return <div className={'v-list'}>
    {event.payments.map(payment => <div className={'v-list__item'} key={payment.id}>
      <EventPayment payment={payment}
                    edit={onPaymentEdit}
                    deleteClick={onPaymentDelete}
                    readOnly={event.closed}
                    users={users}/>
    </div>)}
  </div>
}

export default EventPaymentList;
