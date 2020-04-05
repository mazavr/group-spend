import React from 'react';
import {observer} from 'mobx-react';
import MoneyTransferPanel from '../../components/MoneyTransferPanel';
import {getRequiredTransfers, TransferInputItem} from '../../utils/payment';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';
import {useStore} from '../../App/AppContext';

export default observer(function SessionMoneyTransferPanel({session}) {
  const {modalDialogStore, userStore} = useStore();

  const transfersForPanel = (() => {
    const payments = [];

    session.events.forEach(event => {
      if (!event.closed) {
        event.payments.forEach(payment => {
          payments.push(new TransferInputItem({
            key: userStore.users.find(u => u.id === payment.userId),
            balance: payment.amount - payment.totalAmount
          }))
        })
      }
    });

    return getRequiredTransfers(payments)
  })();

  const openSession = () => {
    session.setClosed(false);
  };

  const closeSession = () => {
    modalDialogStore.show(new ModalDialog({
      header: `Close session "${session.title}"?`,
      body: 'It will close all opened session events. Operation can\'t be undone',
      type: dialogTypes.CONFIRM,
      okClick: () => session.setClosed(true)
    }))
  };

  return <MoneyTransferPanel
    openedTitle={'Required transfers to close session:'}
    closedTitle={'Session was closed.'}
    noTransfersText={'No transfers required'}
    transfers={transfersForPanel}
    close={closeSession}
    open={openSession}
    closed={session.closed}/>
})
