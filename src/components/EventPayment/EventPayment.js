import React, {useEffect} from 'react';
import {useValidator} from '../../validation/useValidator';

const validationRules = {
  totalAmount: {
    notNegative: {
      message: 'Should be not negative',
      validate: amount => amount >= 0
    }
  },
  amount: {
    notNegative: {
      message: 'Should be not negative',
      validate: amount => amount >= 0
    }
  }
};

function EventPayment({payment, users, deleteClick, edit, readOnly}) {
  const {errors, validate} = useValidator(validationRules);

  useEffect(() => {
    validate(payment, ['totalAmount', 'amount']);
  }, [payment, validate]);

  return (
    <div className={'panel'}>
      <div className={'panel__drag-helper js-drag-helper'}></div>
      <div className={'v-list'}>
        <div className={'v-list__item'}>
          <div className={'trailing-block'}>
            <div className={'trailing-block__body'}>
              <select className={'base-input'}
                      disabled={readOnly}
                      value={payment.userId}
                      data-value={payment.userId}
                      onChange={event => edit({...payment, userId: event.target.value})}>
                {users.map(user =>
                  <option key={user.id} value={user.id} >{user.name}</option>
                )}
              </select>
            </div>
            {readOnly || <div className={'trailing-block__tail'}>
              <button type={'button'} className={'base-button base-button--danger'}
                      onClick={() => deleteClick(payment)}>
                Del
              </button>
            </div>}
          </div>
        </div>
        <div className={'v-list__item'}>
          <div className={'h-list h-list--pull-right'}>
            <div className={'h-list__item float--left'}>
              <label className={'base-label base-label--inline'}>
                <input type={'checkbox'}
                       checked={payment.isCustomTotal}
                       disabled={readOnly}
                       onChange={event => edit({...payment, isCustomTotal: event.target.checked})}/>
                <span className={'base-label__text'}>Custom total</span>
              </label>
            </div>
            <div className={'h-list__item'}>
              <input type={'number'}
                     min={0}
                     readOnly={readOnly}
                     className={`base-input base-input--money-input ${errors && errors.amount ? 'base-input--invalid' : ''}`}
                     value={payment.amount}
                     onFocus={e => e.target.select()}
                     onChange={event => edit({...payment, amount: +event.target.value})}/>
            </div>
            <div className={'h-list__item'}>
              <div className={'money-separator-text'}>of</div>
            </div>
            <div className={'h-list__item'}>
              <input type={'number'}
                     min={0}
                     readOnly={readOnly || !payment.isCustomTotal}
                     className={`base-input base-input--money-input ${errors && errors.totalAmount ? 'base-input--invalid' : ''}`}
                     value={payment.totalAmount}
                     onFocus={e => e.target.select()}
                     onChange={event => edit({...payment, totalAmount: +event.target.value})}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPayment;
