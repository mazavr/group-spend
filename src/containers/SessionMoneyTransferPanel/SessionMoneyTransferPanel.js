import React from 'react';
import MoneyTransferPanel from '../../components/MoneyTransferPanel';
import {getRequiredTransfers, TransferInputItem} from '../../utils/payment';
import {closeSession as closeSessionAction, updateSession as updateSessionAction} from '../../store/sessionsActions';
import {showDialog} from '../../store/modalDialogsActions';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';

function SessionMoneyTransferPanel({session, users, dispatch}) {
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

  const openSession = () => {
    dispatch(updateSessionAction({...session, closed: false}));
  };

  const closeSession = () => {
    dispatch(showDialog(new ModalDialog({
      header: `Close session "${session.title}"?`,
      body: 'It will close all opened session events. Operation can\'t be undone',
      type: dialogTypes.CONFIRM,
      okClick: () => dispatch(closeSessionAction(session.id))
    })))
  };

  return <MoneyTransferPanel
    openedTitle={'Required transfers to close session:'}
    closedTitle={'Session was closed.'}
    noTransfersText={'No transfers required'}
    transfers={transfersForPanel}
    close={closeSession}
    open={openSession}
    closed={session.closed}/>
}

export default SessionMoneyTransferPanel;
