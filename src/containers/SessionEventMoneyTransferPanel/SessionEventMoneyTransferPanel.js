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
  }, [event]);

  return <MoneyTransferPanel title={'Required transfers to close session:'}
                             transfers={transfersForPanel}
                             close={onCloseSession}
                             open={onOpenSession}
                             closed={event.closed}/>
}

export default SessionEventMoneyTransferPanel;
