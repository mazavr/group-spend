import React, {useContext, useState} from 'react';
import {globalContext} from '../../store/globalReducer';
import {actionTypes} from '../../store/globalActions';
import {clone} from '../../utils/object';
import SessionsService from '../../services/SessionsService';
import './styles.scss'
import id from "../../utils/id";
import EventPayment from "../../components/EventPayment";
import MoneyTransferPanel from "../../components/MoneyTransferPanel";
import {getRequiredTransfers} from "../../utils/payment";

function SessionEventForm() {
  const [{selectedSession, selectedSessionEvent, users}, dispatch] = useContext(globalContext);
  const [editingEvent, setEditingEvent] = useState(clone(selectedSessionEvent));

  const cancel = () => {
    dispatch({type: actionTypes.SET_SELECTED_SESSION_EVENT, event: null})
  };

  const update = () => {
    SessionsService.updateEvent(selectedSession.id, {...selectedSessionEvent, ...editingEvent}).then(() => {
      SessionsService.querySessions().then(sessions => {
        dispatch({type: actionTypes.SET_SESSIONS, sessions});
        dispatch({type: actionTypes.SET_SELECTED_SESSION_EVENT, event: null})
      })
    })
  };

  const addPayment = userId => {
    setEditingEvent({
      ...editingEvent, payments: [...editingEvent.payments, {
        id: id(),
        userId,
        amount: 0,
        totalAmount: 0
      }]
    })
  };

  const onPaymentEdit = payment => {
    let existingPayment = editingEvent.payments.find(p => p.id === payment.id);
    if (existingPayment) {
      Object.assign(existingPayment, payment);
      setEditingEvent({...editingEvent})
    }
  };

  const onFieldEdit = event => {
    setEditingEvent(event)
  };

  const onPaymentDelete = paymentToDelete => {
    setEditingEvent({
      ...editingEvent,
      payments: editingEvent.payments.filter(payment => payment.id !== paymentToDelete.id)
    })
  };

  const formIsValid = () => {
    let {totalBalance, totalAmount} = editingEvent.payments.reduce((p, c) => {
      p.totalBalance += c.amount - c.totalAmount;
      p.totalAmount += c.totalAmount;
      return p;
    }, {totalBalance: 0, totalAmount: 0});

    return totalBalance === 0 && totalAmount === editingEvent.amount;
  };

  const getTransfersForPanel = () => {
    if (!formIsValid()) {
      return [];
    }

    let preparedPayments = editingEvent.payments.map(p => ({
      key: users.find(u => u.id === p.userId),
      balance: p.amount - p.totalAmount
    }));

    return getRequiredTransfers(preparedPayments)
  };

  const onOpen = () => {
    SessionsService.updateEvent(selectedSession.id, {
      ...selectedSessionEvent, ...editingEvent,
      closed: false
    }).then(event => {
      setEditingEvent(event);
      dispatch({type: actionTypes.SET_SELECTED_SESSION_EVENT, event})
    })
  };

  const onClose = () => {
    SessionsService.updateEvent(selectedSession.id, {
      ...selectedSessionEvent, ...editingEvent,
      closed: true
    }).then(event => {
      setEditingEvent(event);
      dispatch({type: actionTypes.SET_SELECTED_SESSION_EVENT, event})
    })
  };

  return (
    <div className={'v-list'}>
      <div className={'v-list__item'}>
        <h4>
          Edit session event
        </h4>
      </div>
      <div className={'v-list__item'}>
        <div className={'trailing-block'}>
          <div className={'trailing-block__body'}>
            <input className={'base-input'}
                   value={editingEvent.title}
                   onChange={event => onFieldEdit({...editingEvent, title: event.target.value})}/>
          </div>
          <div className={'trailing-block__tail'}>
            <input type={'number'}
                   className={'base-input base-input--money-input'}
                   readOnly={editingEvent.closed}
                   value={editingEvent.amount}
                   onChange={event => onFieldEdit({...editingEvent, amount: +event.target.value})}/>
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
      {editingEvent.closed || <div className={'v-list__item v-list__item--4xgap'}>
        <label className={'base-label'}>Choose friend to add payment:</label>
        <select className={'base-input'} onChange={event => addPayment(+event.target.value)} value={''}>
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
      {formIsValid() && <div className={'v-list__item  v-list__item--4xgap'}>
        <MoneyTransferPanel transfers={getTransfersForPanel()}
                            closed={editingEvent.closed}
                            close={onClose}
                            open={onOpen}/>
      </div>}
    </div>
  )
}

export default SessionEventForm
