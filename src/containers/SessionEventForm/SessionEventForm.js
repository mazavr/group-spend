import React, {useContext, useEffect, useMemo, useState} from 'react';
import {globalContext} from '../../store/globalReducer';
import {openSessionEvent, setSelectedSessionEventId, showDialog, updateSessionEvent} from '../../store/globalActions';
import {clone} from '../../utils/object';
import './styles.scss'
import {recalculatePaymentsTotalAmount} from '../../utils/payment';
import BlockError from '../../components/BlockError';
import Payment from '../../models/Payment';
import SessionEventMoneyTransferPanel from '../SessionEventMoneyTransferPanel';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';
import {useValidator} from '../../validation/useValidator';
import EventPaymentList from '../EventPaymentList';
import SessionEvent from '../../models/SessionEvent';

function SessionEventForm() {
  const [{selectedSessionId, selectedSessionEventId, users, sessions}, dispatch] = useContext(globalContext);
  const originalSessionEvent = useMemo(() => {
    return sessions.find(session => session.id === selectedSessionId).events.find(event => event.id === selectedSessionEventId);
  }, [sessions, selectedSessionId, selectedSessionEventId]);
  const [editingEvent, setEditingEvent] = useState(new SessionEvent());

  useEffect(() => {
    setEditingEvent(clone(originalSessionEvent))
  }, [originalSessionEvent]);

  const getRequiredAmount = () => editingEvent.amount - editingEvent.payments.reduce((p, c) => p + c.amount, 0);
  const getRequiredTotalAmount = () => editingEvent.amount - editingEvent.payments.reduce((p, c) => p + c.totalAmount, 0);

  const requiredAmount = getRequiredAmount();
  const requiredTotalAmount = getRequiredTotalAmount();

  const {errors, validate} = useValidator({
    title: {
      required: {
        message: 'Title is required',
        validate: title => !!title
      },
      unique: {
        message: 'Already exists',
        validate: title => originalSessionEvent.title === title || !sessions.find(session => session.title === title)
      }
    },
    amount: {
      notNegative: {
        message: 'Should be not negative',
        validate: value => value >= 0
      }
    },
    form: {
      requiredAmount: {
        message: 'requiredAmount',
        validate: () => getRequiredAmount() === 0
      },
      requiredTotalAmount: {
        message: 'requiredTotalAmount',
        validate: () => getRequiredTotalAmount() === 0
      }
    }
  });

  const cancel = () => {
    dispatch(setSelectedSessionEventId(null))
  };

  const update = () => {
    if (validate(editingEvent, ['title', 'amount', 'form'])) {
      dispatch(updateSessionEvent(selectedSessionId, editingEvent));
      dispatch(setSelectedSessionEventId(null));
    }
  };

  const setEditingEventWithCalculation = event => {
    setEditingEvent(recalculatePaymentsTotalAmount(event));
  };

  const addPayment = userId => {
    setEditingEventWithCalculation({
      ...editingEvent,
      payments: [...editingEvent.payments, new Payment({userId})]
    })
  };

  const onPaymentEdit = payment => {
    setEditingEventWithCalculation({
      ...editingEvent,
      payments: editingEvent.payments.map(eventPayment => {
        return eventPayment.id === payment.id
          ? {...eventPayment, ...payment}
          : eventPayment;
      })
    });
  };

  const onFieldEdit = event => {
    setEditingEventWithCalculation(event);
    validate(event, ['title', 'amount']);
  };

  const onPaymentDelete = payment => {
    dispatch(showDialog(new ModalDialog({
      header: `Delete payment of user "${users.find(user => user.id === payment.userId).name}"?`,
      body: 'Operation can\'t be undone',
      type: dialogTypes.CONFIRM,
      okClick: () => setEditingEventWithCalculation({
        ...editingEvent,
        payments: editingEvent.payments.filter(eventPayment => eventPayment.id !== payment.id)
      })
    })))
  };

  const onOpen = () => {
    dispatch(openSessionEvent(selectedSessionId, {...editingEvent, closed: false}));
  };

  const onClose = () => {
    dispatch(showDialog(new ModalDialog({
      header: `Close event "${editingEvent.title}"?`,
      body: 'Are you sure you want to close event?',
      type: dialogTypes.CONFIRM,
      okClick: () => dispatch(updateSessionEvent(selectedSessionId, {...editingEvent, closed: true}))
    })))
  };

  return (
    <div className={'v-list'}>
      <div className={'v-list__item'}>
        <h5>
          Edit session event
        </h5>
      </div>
      <div className={'v-list__item'}>
        <div className={'trailing-block'}>
          <div className={'trailing-block__body'}>
            <input className={`base-input ${errors.title ? 'base-input--invalid' : ''}`}
                   value={editingEvent.title}
                   onChange={event => onFieldEdit({...editingEvent, title: event.target.value})}/>
            <BlockError errors={errors.title}/>
          </div>
          <div className={'trailing-block__tail'}>
            <input type={'number'}
                   min={0}
                   className={`base-input base-input--money-input ${errors.amount ? 'base-input--invalid' : ''}`}
                   readOnly={editingEvent.closed}
                   onFocus={e => e.target.select()}
                   value={editingEvent.amount}
                   onChange={event => onFieldEdit({...editingEvent, amount: +event.target.value})}/>
          </div>
        </div>
      </div>
      <div className={'v-list__item'}>
        <h5>Payments ({editingEvent.payments.length})</h5>
      </div>
      <div className={'v-list__item'}>
        {editingEvent.payments.length ? (
          <EventPaymentList event={editingEvent}
                            onPaymentDelete={onPaymentDelete}
                            onPaymentEdit={onPaymentEdit}/>
        ) : (
          <div className={'base-text'}>No payments yet</div>
        )}
      </div>
      {requiredAmount !== 0 && <div className={'v-list__item'}>
        <div className={`panel ${errors.form && errors.form.requiredAmount ? 'panel--danger' : 'panel--info'}`}>
          <div className={'panel__text'}>Pay <b>{requiredAmount}</b> to complete</div>
        </div>
      </div>}
      {requiredTotalAmount !== 0 && <div className={'v-list__item'}>
        <div className={`panel ${errors.form && errors.form.requiredTotalAmount ? 'panel--danger' : 'panel--info'}`}>
          <div className={'panel__text'}>Split <b>{requiredTotalAmount}</b> of total amount to complete</div>
        </div>
      </div>}
      {editingEvent.closed || <div className={'v-list__item v-list__item--4xgap'}>
        <label className={'base-label'}>Choose friend to add payment:</label>
        <select className={'base-input'} onChange={event => addPayment(event.target.value)} value={''}>
          <option value=""></option>
          {users.map(user =>
            <option key={user.id} value={user.id}>{user.name}</option>
          )}
        </select>
      </div>}
      <div className={'v-list__item  v-list__item--4xgap'}>
        <div className={'h-list h-list--pull-right'}>
          <div className={'h-list__item'}>
            <button type={'button'} className={'base-button base-button--light'} onClick={cancel}>Cancel</button>
          </div>
          <div className={'h-list__item'}>
            <button type={'button'} className={'base-button base-button--success'} onClick={update}>Ok</button>
          </div>
        </div>
      </div>
      {requiredAmount === 0 && requiredTotalAmount === 0 && <div className={'v-list__item  v-list__item--4xgap'}>
        <SessionEventMoneyTransferPanel onOpenSession={onOpen}
                                        onCloseSession={onClose}
                                        event={editingEvent}/>
      </div>}
    </div>
  )
}

export default SessionEventForm;
