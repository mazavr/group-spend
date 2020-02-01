import React, {useContext, useEffect, useState} from 'react';
import EditableList from "../../components/EditableList/EditableList";
import {globalContext} from "../../store/globalReducer";
import SessionsService from "../../services/SessionsService";
import {actionTypes} from "../../store/globalActions";

function EventList({session}) {
  const [, dispatch] = useContext(globalContext);
  const [listItems, setListItems] = useState([])

  useEffect(() => {
    setListItems(session.events.map(e => ({
      id: e.id,
      title: e.title + (e.closed ? ' (closed)' : '')
    })))
  }, [session.events]);

  const deleteClick = ({id}) => {
    SessionsService.deleteEvent(session.id, id).then(() => {
      SessionsService.querySessions().then(sessions => {
        dispatch({type: actionTypes.SET_SESSIONS, sessions});
        dispatch({type: actionTypes.SET_SELECTED_SESSION, session: sessions.find(s => s.id === session.id)})
      })
    })
  };
  const titleClick = ({id}) => {
    let event = session.events.find(e => e.id === id);
    dispatch({type: actionTypes.SET_SELECTED_SESSION_EVENT, event});
  };

  const addEventClick = title => {
    SessionsService.createEvent(session.id, {title, payments: [], closed: false, amount: 0}).then(() => {
      SessionsService.querySessions().then(sessions => {
        dispatch({type: actionTypes.SET_SESSIONS, sessions});
        dispatch({type: actionTypes.SET_SELECTED_SESSION, session: sessions.find(s => s.id === session.id)})
      })
    })
  };

  return (
    <div className={'v-list'}>
      <div className={'v-list__item'}>
        <h5>Session events:</h5>
      </div>
      <div className={'v-list__item'}>
        <EditableList items={listItems}
                      deleteClick={deleteClick}
                      titleClick={titleClick}
                      addClick={addEventClick}
                      addPlaceholder={'New event'}/>
      </div>
    </div>
  )
}

export default EventList;
