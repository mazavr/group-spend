import React from 'react';
import MoneyTransferList from '../MoneyTransferList';

function MoneyTransferPanel({transfers, closed, open, close, title}) {
  return (
    <div className={'panel panel--info'}>
      <div className={'v-list'}>
        <div className={'v-list__item'}>
          {closed ? (
            <h5>Was closed with next transfers:</h5>
          ) : (
            <h5>{title || 'Required transfers to close:'}</h5>
          )}
        </div>
        <div className={'v-list__item'}>
          <MoneyTransferList transfers={transfers}/>
        </div>
        <div className={'v-list__item  v-list__item--4xgap'}>
          <div className={'h-list h-list--pull-right'}>
            <div className={'h-list__item'}>
              {closed ? (
                <button type={'button'}
                        className={'base-button base-button--light'}
                        onClick={open}>Open</button>
              ) : (
                <button type={'button'}
                        className={'base-button base-button--success'}
                        onClick={close}>Close</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoneyTransferPanel;
