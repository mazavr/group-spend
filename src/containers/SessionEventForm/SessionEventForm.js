import React, {useState} from 'react';
import {observer} from 'mobx-react';
import './styles.scss'
import {getRequiredEventAmount, getRequiredEventTotalAmount} from '../../utils/payment';
import BlockError from '../../components/BlockError';
import Payment from '../../stores/Payment';
import SessionEventMoneyTransferPanel from '../SessionEventMoneyTransferPanel';
import {useValidator} from '../../validation/useValidator';
import EventPaymentList from '../EventPaymentList';
import ValidationRule, {validationRuleTypes} from '../../validation/ValidationRule';
import {useStore} from '../../App/AppContext';
import SessionEvent from '../../stores/SessionEvent';

export default observer(function SessionEventForm({event}) {
  const {shellStore, userStore} = useStore();

  const [editingEvent] = useState(() => {
    let newEvent = new SessionEvent();
    newEvent.load(event);
    return newEvent;
  });

  // useEffect(
  //   () => autorun(() => editingEvent.recalculatePaymentsTotalAmount()),
  //   []
  // );

  const requiredAmount = getRequiredEventAmount(editingEvent);
  const requiredTotalAmount = getRequiredEventTotalAmount(editingEvent);

  const {errors, validate} = useValidator({
    title: {
      [validationRuleTypes.REQUIRED]: 'Title is required',
      [validationRuleTypes.NOT_ONLY_WHITESPACES]: 'Title is empty',
      unique: new ValidationRule({
        message: 'Already exists',
        validate: title => {
          return event.title === title || !shellStore.selectedSession.events.find(event => event.title === title);
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

  const cancel = () => shellStore.setSelectedSessionEventId(null);

  const validateEvent = () => validate(editingEvent, ['title', 'amount', 'form']);

  const update = () => {
    if (validateEvent()) {
      event.load(editingEvent); // todo: or/when assign?
      shellStore.setSelectedSessionEventId(null);
    }
  };

  const addPayment = userId => {
    editingEvent.addPayment(new Payment({userId}));
    editingEvent.recalculatePaymentsTotalAmount(); // todo: add auto run?
  };

  const onAmountChange = amount => {
    editingEvent.setAmount(amount);
    editingEvent.recalculatePaymentsTotalAmount();
    validate(editingEvent, ['amount']);
  };

  const onTitleChange = title => {
    editingEvent.setTitle(title);
    validate(editingEvent, ['title']);
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
                   onChange={event => onTitleChange(event.target.value)}/>
            <BlockError errors={errors.title} showFirstOnly={true}/>
          </div>
          <div className={'trailing-block__tail'}>
            <input type={'number'}
                   min={0}
                   className={`base-input base-input--money-input ${errors.amount ? 'base-input--invalid' : ''}`}
                   readOnly={editingEvent.closed}
                   onFocus={e => e.target.select()}
                   value={editingEvent.amount}
                   onChange={event => onAmountChange(+event.target.value)}/>
          </div>
        </div>
      </div>
      <div className={'v-list__item v-list__item--4xgap'}>
        <h5>Friends payments ({editingEvent.payments.length}):</h5>
      </div>
      <div className={'v-list__item'}>
        {editingEvent.payments.length ? (
          <EventPaymentList event={editingEvent}/>
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
          {userStore.users.map(user =>
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
      {requiredAmount === 0 && requiredTotalAmount === 0 && (
        <div className={'v-list__item  v-list__item--4xgap'}>
          <SessionEventMoneyTransferPanel onUpdate={update}
                                          event={editingEvent}
                                          beforeOpen={validateEvent}
                                          beforeClose={validateEvent}/>
        </div>
      )}
    </div>
  )
})
