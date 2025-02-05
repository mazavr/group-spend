import React, {useEffect, useMemo, useState} from 'react';
import {setSelectedSessionEventId} from '../../store/globalActions';
import {updateSessionEvent} from '../../store/sessionsActions';
import './styles.scss'
import {getRequiredEventAmount, getRequiredEventTotalAmount, recalculatePaymentsTotalAmount} from '../../utils/payment';
import BlockError from '../../components/BlockError';
import Payment from '../../models/Payment';
import SessionEventMoneyTransferPanel from '../SessionEventMoneyTransferPanel';
import {useValidator} from '../../validation/useValidator';
import EventPaymentList from '../EventPaymentList';
import {clone} from '../../utils/object';
import {moveInArray} from '../../utils/array';
import ValidationRule, {validationRuleTypes} from '../../validation/ValidationRule';

function SessionEventForm({selectedSessionId, selectedSessionEventId, users, sessions, dispatch}) {
  const {originalSessionEvent, originalSessionTitle, originalSession} = useMemo(() => {
    let originalSession = sessions.find(session => session.id === selectedSessionId);
    let originalSessionEvent = originalSession.events.find(event => event.id === selectedSessionEventId);
    return {originalSessionEvent, originalSessionTitle: originalSessionEvent.title, originalSession};
  }, [sessions, selectedSessionId, selectedSessionEventId]);
  const [editingEvent, setEditingEvent] = useState(clone(originalSessionEvent));

  useEffect(() => {
    setEditingEvent(clone(originalSessionEvent));
  }, [originalSessionEvent]);

  const requiredAmount = getRequiredEventAmount(editingEvent);
  const requiredTotalAmount = getRequiredEventTotalAmount(editingEvent);

  const {errors, validate} = useValidator({
    title: {
      [validationRuleTypes.REQUIRED]: 'Title is required',
      [validationRuleTypes.NOT_ONLY_WHITESPACES]: 'Title is empty',
      unique: new ValidationRule({
        message: 'Already exists',
        validate: title => {
          return originalSessionTitle === title || !originalSession.events.find(event => event.title === title);
        }
      })
    },
    amount: {
      [validationRuleTypes.NOT_NEGATIVE]: 'Should be not negative'
    },
    form: {
      requiredAmount: new ValidationRule({
        message: 'requiredAmount',
        validate: function validate() {
          return getRequiredEventAmount(this) === 0
        }
      }),
      requiredTotalAmount: new ValidationRule({
        message: 'requiredTotalAmount',
        validate: function validate() {
          return getRequiredEventTotalAmount(this) === 0;
        }
      })
    }
  });

  const cancel = () => {
    dispatch(setSelectedSessionEventId(null))
  };

  const validateEvent = () => validate(editingEvent, ['title', 'amount', 'form']);

  const update = () => {
    if (validateEvent()) {
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

  const onFieldEdit = event => {
    setEditingEventWithCalculation(event);
    validate(event, ['title', 'amount']);
  };

  const sortPayments = (indFrom, indTo) => {
    setEditingEventWithCalculation({...editingEvent, payments: moveInArray(editingEvent.payments, indFrom, indTo)})
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
            <BlockError errors={errors.title} showFirstOnly={true}/>
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
      <div className={'v-list__item v-list__item--4xgap'}>
        <h5>Friends payments ({editingEvent.payments.length}):</h5>
      </div>
      <div className={'v-list__item'}>
        {editingEvent.payments.length ? (
          <EventPaymentList eventEdit={setEditingEventWithCalculation}
                            dispatch={dispatch}
                            event={editingEvent}
                            users={users}
                            sort={sortPayments}/>
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
        <SessionEventMoneyTransferPanel dispatch={dispatch}
                                        sessionId={selectedSessionId}
                                        users={users}
                                        event={editingEvent}
                                        beforeOpen={validateEvent}
                                        beforeClose={validateEvent}/>
      </div>}
    </div>
  )
}

export default React.memo(SessionEventForm);
