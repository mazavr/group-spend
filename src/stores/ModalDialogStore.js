import {action, decorate, observable} from 'mobx';

class ModalDialogStore {
  modalDialogs = [];

  constructor({rootStore}) {
    this.rootStore = rootStore;
  }

  show(dialog) {
    this.modalDialogs.push(dialog);
  }

  hide() {
    this.modalDialogs.pop();
  }
}

decorate(ModalDialogStore, {
  modalDialogs: observable,
  show: action,
  hide: action
});

export default ModalDialogStore;
