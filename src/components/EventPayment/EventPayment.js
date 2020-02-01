import React from "react";

function EventPayment({payment, users, deleteClick, edit, readOnly}) {


  return (
    <div className={'panel'}>
      <div className={'v-list'}>
        <div className={'v-list__item'}>
          <div className={'trailing-block'}>
            <div className={'trailing-block__body'}>
              <select className={'base-input'}
                      disabled={readOnly}
                      value={payment.userId}
                      onChange={event => edit({...payment, userId: +event.target.value})}>
                {users.map(user =>
                  <option key={user.id} value={user.id}>{user.name}</option>
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
            <div className={'h-list__item'}>
              <input type={'number'}
                     readOnly={readOnly}
                     className={'base-input base-input--money-input'}
                     value={payment.amount}
                     onChange={event => edit({...payment, amount: +event.target.value})}/>
            </div>
            <div className={'h-list__item'}>
              <div className={'money-separator-text'}>of</div>
            </div>
            <div className={'h-list__item'}>
              <input type={'number'}
                     readOnly={readOnly}
                     className={'base-input base-input--money-input'}
                     value={payment.totalAmount}
                     onChange={event => edit({...payment, totalAmount: +event.target.value})}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPayment;
