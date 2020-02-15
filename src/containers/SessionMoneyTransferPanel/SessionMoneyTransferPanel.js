import React, {useContext, useMemo} from 'react';
import MoneyTransferPanel from '../../components/MoneyTransferPanel';
import {getRequiredTransfers, TransferInputItem} from '../../utils/payment';
import {globalContext} from '../../store/globalReducer';

function SessionMoneyTransferPanel({session, onCloseSession, onOpenSession}) {
  const [{users}] = useContext(globalContext);
  const transfersForPanel = useMemo(() => {
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
  }, [session, users]);

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
