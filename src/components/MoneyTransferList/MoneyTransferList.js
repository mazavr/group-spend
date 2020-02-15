import React from 'react';

function MoneyTransferList({transfers}) {
  return (
    <div className={'v-list'}>
      {transfers.map(transfer =>
        <div className={'v-list__item'}
             key={transfer.from.id + ' ' + transfer.to.id}>
          <div className={'trailing-block'}>
            <div className={'trailing-block__body'}>
              <div className={'h-list'}>
                <div className={'h-list__item'}>
                  <div className={'base-text'}>{transfer.from.name}</div>
                </div>
                <div className={'h-list__item'}>
                  <div className={'base-text'}>&#10140;</div>
                </div>
                <div className={'h-list__item'}>
                  <div className={'base-text'}>{transfer.to.name}</div>
                </div>
              </div>
            </div>
            <div className={'trailing-block__tail'}>
              <div className={'base-text'}>{transfer.amount}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MoneyTransferList;
