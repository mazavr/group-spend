import React from 'react';
import EventPayment from '../../components/EventPayment';

function EventPaymentList({event, onPaymentEdit, onPaymentDelete, users}) {
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
