import {action, observable, decorate, computed} from 'mobx';
import viewNames from '../constants/viewNames';

class ShellStore {
  view = viewNames.SESSIONS;
  selectedSessionId = null;
  selectedSessionEventId = null;
  selectedUserId = null;

  constructor({rootStore}) {
    this.rootStore = rootStore;
  }

  setView(view) {
    this.view = view;
  }

  setSelectedSessionId(id) {
    this.selectedSessionId = id;
  }

  setSelectedSessionEventId(id) {
    this.selectedSessionEventId = id;
  }

  setSelectedUserId(id) {
    this.selectedUserId = id;
  }

  get selectedSession() {
    return this.selectedSessionId
      ? this.rootStore.sessionStore.sessions.find(session => session.id === this.selectedSessionId)
      : null;
  }

  get selectedSessionEvent() {
    return this.selectedSession
      ? this.selectedSession.events.find(event => event.id === this.selectedSessionEventId)
      : null;
  }
}

decorate(ShellStore, {
  view: observable,
  selectedSessionId: observable,
  selectedSessionEventId: observable,
  selectedUserId: observable,
  setView: action,
  setSelectedSessionId: action,
  setSelectedSessionEventId: action,
  setSelectedUserId: action,
  selectedSession: computed,
  selectedSessionEvent: computed
});

export default ShellStore;
