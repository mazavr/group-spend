import {clone} from '../utils/object';
import id from "../utils/id";

let sessions = [];
let sessionId = 1;

const querySessions = () => {
  return Promise.resolve(sessions.map(s => s))
};

const updateSession = (id, session) => {
  let existingSession = sessions.find(session => session.id === id);
  if (existingSession) {
    Object.assign(existingSession, session);
    return Promise.resolve(clone(existingSession));
  }

  return Promise.reject();
};

const createSession = session => {
  let sessionToSave = {...session, id: sessionId++};
  sessions.push(sessionToSave);
  return Promise.resolve(sessionToSave)
};

const createEvent = (sessionId, event) => {
  let existingSession = sessions.find(s => s.id === sessionId);
  if (existingSession) {
    event = {...event, id: id()};
    existingSession.events = [...existingSession.events, event];
    return Promise.resolve(clone(event));
  }

  return Promise.reject()
};

const getSession = id => {
  let foundSession = sessions.find(session => session.id === id);
  return Promise.resolve(clone(foundSession))
};

const deleteSession = id => {
  sessions = sessions.filter(session => session.id !== id);
  return Promise.resolve(id)
};

const deleteEvent = (sessionId, eventId) => {
  let existingSession = sessions.find(s => s.id === sessionId);
  if (existingSession) {
    existingSession.events = existingSession.events.filter(e => e.id !== eventId)
  }

  return Promise.resolve()
};

function updateEvent(sessionId, event) {
  let existingSession = sessions.find(s => s.id === sessionId);

  if (existingSession) {
    let existingEvent = existingSession.events.find(e => e.id === event.id);
    if (existingEvent) {
      Object.assign(existingEvent, event);
    }
    return Promise.resolve(clone(existingEvent))
  }

  return Promise.reject()
}

export default {
  querySessions,
  updateSession,
  createSession,
  deleteSession,
  getSession,
  createEvent,
  updateEvent,
  deleteEvent
}
