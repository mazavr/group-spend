import {configure} from 'mobx';
import UserStore from './UserStore';
import ShellStore from './ShellStore';
import ModalDialogStore from './ModalDialogStore';
import SessionStore from './SessionStore';

configure({enforceActions: 'observed'});

export const createStore = ({users = [], sessions = []} = {}) => {
  let rootStore = {};
  rootStore.userStore = new UserStore({rootStore});
  rootStore.userStore.loadUsers(users);
  rootStore.sessionStore = new SessionStore({rootStore});
  rootStore.sessionStore.loadSessions(sessions);
  rootStore.shellStore = new ShellStore({rootStore});
  rootStore.modalDialogStore = new ModalDialogStore(rootStore);
  return rootStore;
};
