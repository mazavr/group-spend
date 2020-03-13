import React from 'react';
import MoneyTransferPanel from '../../components/MoneyTransferPanel';
import {getRequiredTransfers, TransferInputItem} from '../../utils/payment';
import {openSessionEvent, updateSessionEvent} from '../../store/sessionsActions';
import {showDialog} from '../../store/modalDialogsActions';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';

function SessionEventMoneyTransferPanel({event, users, sessionId, dispatch, beforeOpen, beforeClose}) {
  const transfersForPanel = (() => {
    let preparedPayments = event.payments.map(p => new TransferInputItem(({
      key: users.find(u => u.id === p.userId),
      balance: p.amount - p.totalAmount
    })));

    return getRequiredTransfers(preparedPayments)
  })();

  const onOpen = () => {
    if (!beforeOpen()) {
      return;
    }

    dispatch(openSessionEvent(sessionId, {...event, closed: false}))
  };

  const onClose = () => {
    if (!beforeClose()) {
      return;
    }

    dispatch(showDialog(new ModalDialog({
      header: `Close event "${event.title}"?`,
      body: 'Are you sure you want to close event?',
      type: dialogTypes.CONFIRM,
      okClick: () => dispatch(updateSessionEvent(sessionId, {...event, closed: true}))
    })))
  };

  return <MoneyTransferPanel
    openedTitle={'Required transfers to close event:'}
    closedTitle={'Event was closed with next transfers:'}
    noTransfersText={'No transfers required'}
    transfers={transfersForPanel}
    close={onClose}
    open={onOpen}
    closed={event.closed}
    closeButtonText={'Close and Save'}
    openButtonText={'Open and Save'}
  />
}

export default SessionEventMoneyTransferPanel;
