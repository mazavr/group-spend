import {action, observable, decorate} from 'mobx';
import {moveInArray} from '../utils/array';
import Session from './Session';

class SessionStore {
  sessions = [];

  constructor({rootStore}) {
    this.rootStore = rootStore;
  }

  addSession(session) {
    this.sessions.push(session);
  }

  removeSession(id) {
    this.sessions.replace(
      this.sessions.filter(session => session.id !== id)
    )
  }

  moveSession(indFrom, indTo) {
    this.sessions.replace(
      moveInArray(this.sessions, indFrom, indTo)
    );
  }

  isUserInSessionUse(userId) {
    return !this.sessions.some(session => {
      return session.events.some(event => {
        return event.payments.some(payment => {
          return payment.userId === userId
        })
      })
    })
  }

  loadSessions(sessions) {
    this.sessions.replace(
      sessions.map(sessionJson => {
        const session = new Session();
        session.load(sessionJson);
        return session;
      })
    )
  }
}

decorate(SessionStore, {
  sessions: observable,
  addSession: action,
  removeSession: action,
  moveSession: action
});

export default SessionStore;
