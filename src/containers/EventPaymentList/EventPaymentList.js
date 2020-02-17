import React, {useContext} from 'react';
import EventPayment from '../../components/EventPayment';
import {globalContext} from '../../store/globalReducer';

function EventPaymentList({event, onPaymentEdit, onPaymentDelete}) {
  const [{users}] = useContext(globalContext);

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
