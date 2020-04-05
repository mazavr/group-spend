import React from 'react';
import {observer} from 'mobx-react';
import MoneyTransferPanel from '../../components/MoneyTransferPanel';
import {getRequiredTransfers, TransferInputItem} from '../../utils/payment';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';
import {useStore} from '../../App/AppContext';

export default observer(function SessionEventMoneyTransferPanel({event, beforeOpen, beforeClose, onUpdate}) {
  const {modalDialogStore, userStore} = useStore();

  const transfersForPanel = (() => {
    let preparedPayments = event.payments.map(p => new TransferInputItem(({
      key: userStore.users.find(u => u.id === p.userId),
      balance: p.amount - p.totalAmount
    })));

    return getRequiredTransfers(preparedPayments)
  })();

  const onOpen = () => {
    if (!beforeOpen()) {
      return;
    }

    event.setClosed(false);
    onUpdate();
  };

  const onClose = () => {
    if (!beforeClose()) {
      return;
    }

    modalDialogStore.show(new ModalDialog({
      header: `Close event "${event.title}"?`,
      body: 'Are you sure you want to close event?',
      type: dialogTypes.CONFIRM,
      okClick: () => {
        event.setClosed(true);
        onUpdate();
      }
    }))
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
})
