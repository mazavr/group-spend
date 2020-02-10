import React, {useContext, useMemo} from 'react';
import MoneyTransferPanel from '../../components/MoneyTransferPanel';
import {getRequiredTransfers, TransferInputItem} from '../../utils/payment';
import {globalContext} from '../../store/globalReducer';

function SessionMoneyTransferPanel({session, onCloseSession, onOpenSession}) {
  const [{users}] = useContext(globalContext);
  const transfersForPanel = useMemo(() => {
    let preparedPayments = session.events // todo: performance refactoring
      .filter(event => !event.closed)
      .map(event => event.payments)
      .flat()
      .map(p => new TransferInputItem(({
        key: users.find(u => u.id === p.userId),
        balance: p.amount - p.totalAmount
      })));

    return getRequiredTransfers(preparedPayments)
  }, [session]);

  return <MoneyTransferPanel title={'Required transfers to close session:'}
                             transfers={transfersForPanel}
                             close={onCloseSession}
                             open={onOpenSession}
                             closed={session.closed}/>
}

export default SessionMoneyTransferPanel;
