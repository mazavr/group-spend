import React, {useContext, useMemo, useState} from 'react';
import {globalContext} from '../../store/globalReducer';
import {deleteSessionEvent, setSelectedSessionEventId, showDialog, updateSessionEvent} from '../../store/globalActions';
import {clone} from '../../utils/object';
import './styles.scss'
import id from '../../utils/id';
import EventPayment from '../../components/EventPayment';
import {recalculatePaymentsTotalAmount} from '../../utils/payment';
import BlockError from '../../components/BlockError';
import Payment from '../../models/Payment';
import {validate} from '../../validation/validator';
import SessionEventMoneyTransferPanel from '../SessionEventMoneyTransferPanel';
import ModalDialog, {dialogTypes} from "../../models/ModalDialog";

function SessionEventForm() {
  const [{selectedSessionId, selectedSessionEventId, users, sessions}, dispatch] = useContext(globalContext);
  const originalSessionEvent = useMemo(() => {
    return sessions.find(session => session.id === selectedSessionId).events.find(event => event.id === selectedSessionEventId);
  }, [sessions, selectedSessionId, selectedSessionEventId]);
  const [editingEvent, setEditingEvent] = useState(clone(originalSessionEvent));
  const [errors, setErrors] = useState({});

  const getRequiredAmount = () => editingEvent.amount - editingEvent.payments.reduce((p, c) => p + c.amount, 0);

  const getRequiredTotalAmount = () => editingEvent.amount - editingEvent.payments.reduce((p, c) => p + c.totalAmount, 0);

  const [requiredAmount, requiredTotalAmount] = useMemo(() => {
    return [getRequiredAmount(), getRequiredTotalAmount()]
  }, [editingEvent.amount, editingEvent.payments]);

  const validationRules = {
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
  };

  const checkErrors = (propsArray, modelRules, model) => {
    let validationResult = validate(propsArray, modelRules, model);
    setErrors(validationResult || {});
    return validationResult === undefined;
  };

  const cancel = () => {
    dispatch(setSelectedSessionEventId(null))
  };

  const update = () => {
    if (checkErrors(['title', 'amount', 'form'], validationRules, editingEvent)) {
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
      payments: [...editingEvent.payments, new Payment({
        id: id(),
        userId
      })]
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
    checkErrors(['title', 'amount'], validationRules, event);
  };

  const onPaymentDelete = payment => {
    dispatch(showDialog(new ModalDialog({
      header: 'Delete payment?',
      body: 'Operation can\'t be undone',
      type: dialogTypes.CONFIRM,
      okClick: () => setEditingEventWithCalculation({
        ...editingEvent,
        payments: editingEvent.payments.filter(eventPayment => eventPayment.id !== payment.id)
      })
    })))
  };

  const onOpen = () => {
    setEditingEvent({...editingEvent, closed: false});
    dispatch(updateSessionEvent(selectedSessionId, {...editingEvent, closed: false}));
  };

  const onClose = () => {
    setEditingEvent({...editingEvent, closed: true});
    dispatch(updateSessionEvent(selectedSessionId, {...editingEvent, closed: true}));
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
            <BlockError errors={errors.amount}/>
          </div>
        </div>
      </div>
      <div className={'v-list__item'}>
        <h5>Payments ({editingEvent.payments.length})</h5>
      </div>
      <div className={'v-list__item'}>
        <div className={'v-list'}>
          {editingEvent.payments.length ? (editingEvent.payments.map(payment =>
            <div className={'v-list__item'} key={payment.id}>
              <EventPayment payment={payment}
                            edit={onPaymentEdit}
                            deleteClick={onPaymentDelete}
                            readOnly={editingEvent.closed}
                            users={users}/>
            </div>
          )) : (
            <div className={'base-text'}>No payments yet</div>
          )}
        </div>
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
