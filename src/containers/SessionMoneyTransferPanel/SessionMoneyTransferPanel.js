import React from 'react';
import MoneyTransferPanel from '../../components/MoneyTransferPanel';
import {getRequiredTransfers, TransferInputItem} from '../../utils/payment';

function SessionMoneyTransferPanel({session, onCloseSession, onOpenSession, users}) {
  const transfersForPanel = (() => {
    const payments = [];

    session.events.forEach(event => {
      if (!event.closed) {
        event.payments.forEach(payment => {
          payments.push(new TransferInputItem({
            key: users.find(u => u.id === payment.userId),
            balance: payment.amount - payment.totalAmount
          }))
        })
      }
    });

    return getRequiredTransfers(payments)
  })();

  return <MoneyTransferPanel
    openedTitle={'Required transfers to close session:'}
    closedTitle={'Session was closed.'}
    noTransfersText={'No transfers required'}
    transfers={transfersForPanel}
    close={onCloseSession}
    open={onOpenSession}
    closed={session.closed}/>
}

export default SessionMoneyTransferPanel;
