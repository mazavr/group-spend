import React from 'react';

function MoneyTransferList({transfers}) {
  if (!transfers || transfers.length === 0) {
    return <div className={'base-text'}>No transfers</div>;
  }

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
                  <div className={'base-text'}>-></div>
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
