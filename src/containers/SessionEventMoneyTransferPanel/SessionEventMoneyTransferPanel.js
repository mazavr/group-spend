import React from 'react';
import MoneyTransferPanel from '../../components/MoneyTransferPanel';
import {getRequiredTransfers, TransferInputItem} from '../../utils/payment';

function SessionEventMoneyTransferPanel({event, onCloseSession, onOpenSession, users}) {
  const transfersForPanel = (() => {
    let preparedPayments = event.payments.map(p => new TransferInputItem(({
      key: users.find(u => u.id === p.userId),
      balance: p.amount - p.totalAmount
    })));

    return getRequiredTransfers(preparedPayments)
  })();

  return <MoneyTransferPanel
    openedTitle={'Required transfers to close event:'}
    closedTitle={'Event was closed with next transfers:'}
    noTransfersText={'No transfers required'}
    transfers={transfersForPanel}
    close={onCloseSession}
    open={onOpenSession}
    closed={event.closed}/>
}

export default SessionEventMoneyTransferPanel;
