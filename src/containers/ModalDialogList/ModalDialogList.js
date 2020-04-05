import React from 'react';
import {dialogTypes} from '../../models/ModalDialog';
import {useStore} from '../../App/AppContext';
import {observer} from 'mobx-react';

export default observer(function ModalDialogList() {
  const {modalDialogStore} = useStore();

  if (modalDialogStore.modalDialogs.length === 0) {
    return null;
  }

  const dialog = modalDialogStore.modalDialogs[modalDialogStore.modalDialogs.length - 1];

  const close = () => {
    modalDialogStore.hide();
  };

  const ok = () => {
    modalDialogStore.hide();
    dialog.okClick && dialog.okClick();
  };

  const backdropClick = event => {
    if (event.target.dataset.tag === 'backdrop') {
      close();
    }
  };

  return (
    <div className={'modal'} onClick={backdropClick} data-tag={'backdrop'}>
      <div className={'modal__container'}>
        <div className={'modal__header'}>
          <h5>{dialog.header}</h5>
        </div>
        <div className={'modal__body'}>
          <div className={'base-text'}>{dialog.body}</div>
        </div>
        <div className={'modal__footer'}>
          <div className={'h-list h-list--pull-right'}>
            {dialog.type === dialogTypes.ALERT && <div className={'h-list__item'}>
              <button type={'button'} className={'base-button base-button--light'} onClick={close}>Close</button>
            </div>}
            {dialog.type === dialogTypes.CONFIRM && <>
              <div className={'h-list__item'}>
                <button type={'button'} className={'base-button base-button--light'} onClick={close}>Cancel</button>
              </div>
              <div className={'h-list__item'}>
                <button type={'button'} className={'base-button base-button--success'} onClick={ok}>OK</button>
              </div>
            </>}
          </div>
        </div>
      </div>
    </div>
  )
});
