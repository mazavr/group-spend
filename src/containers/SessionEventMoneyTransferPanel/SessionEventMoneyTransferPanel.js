import React, {useContext, useMemo} from 'react';
import MoneyTransferPanel from '../../components/MoneyTransferPanel';
import {getRequiredTransfers, TransferInputItem} from '../../utils/payment';
import {globalContext} from '../../store/globalReducer';

function SessionEventMoneyTransferPanel({event, onCloseSession, onOpenSession}) {
  const [{users}] = useContext(globalContext);
  const transfersForPanel = useMemo(() => {
    let preparedPayments = event.payments.map(p => new TransferInputItem(({
      key: users.find(u => u.id === p.userId),
      balance: p.amount - p.totalAmount
    })));

    return getRequiredTransfers(preparedPayments)
  }, [event, users]);

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
