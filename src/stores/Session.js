import {action, decorate, observable} from 'mobx';
import id from '../utils/id';
import SessionEvent from './SessionEvent';
import {moveInArray} from '../utils/array';

class Session {
  id = null;
  title = '';
  closed = '';
  events = [];

  constructor(props = {}) {
    this.id = props.id || id();
    this.title = props.title || '';
    this.closed = props.closed || false;
    this.events = props.events || []; // todo: mobx observable?
  }

  setTitle(title) {
    this.title = title;
  }

  addEvent(event) {
    this.events.push(event);
  }

  removeEvent(id) {
    this.events.replace(
      this.events.filter(event => event.id !== id)
    )
  }

  moveEvent(indFrom, indTo) {
    this.events.replace(
      moveInArray(this.events, indFrom, indTo)
    );
  }

  load(sessionJson) {
    this.id = sessionJson.id;
    this.title = sessionJson.title;
    this.closed = sessionJson.closed;
    this.events.replace(
      sessionJson.events.map(eventJson => {
        const event = new SessionEvent();
        event.load(eventJson);
        return event;
      })
    )
  }

  setClosed(closed) {
    this.closed = closed;

    if (closed) {
      this.events.forEach(event => event.setClosed(true))
    }
  }
}

decorate(Session, {
  id: observable,
  title: observable,
  events: observable,
  setTitle: action,
  addEvent: action,
  removeEvent: action,
  moveEvent: action,
  setClosed: action
});

export default Session;
