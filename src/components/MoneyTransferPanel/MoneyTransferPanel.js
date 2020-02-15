import React from 'react';
import MoneyTransferList from '../MoneyTransferList';

function MoneyTransferPanel({transfers, closed, open, close, closedTitle, openedTitle, noTransfersText}) {
  return (
    <div className={'panel panel--info'}>
      <div className={'v-list'}>
        <div className={'v-list__item'}>
          <h5>{closed ? closedTitle : openedTitle}</h5>
        </div>

        {transfers.length > 0 && <div className={'v-list__item'}>
          <MoneyTransferList transfers={transfers}/>
        </div>}

        {transfers.length === 0 && noTransfersText && <div className={'v-list__item'}>
          <div className={'base-text'}>{noTransfersText}</div>
        </div>}

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
