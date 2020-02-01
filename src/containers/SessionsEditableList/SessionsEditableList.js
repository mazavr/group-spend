import React, {useContext, useEffect, useState} from 'react';
import {globalContext} from '../../store/globalReducer';
import {actionTypes} from '../../store/globalActions';
import EditableList from '../../components/EditableList';
import SessionsService from "../../services/SessionsService";

function SessionsEditableList() {
  const [{sessions}, dispatch] = useContext(globalContext);
  const [listItems, setListItems] = useState([]);
  console.log('SessionsEditableList render');
  useEffect(() => {
    console.log('SessionsEditableList useEffect');
    setListItems(sessions.map(session => ({
      id: session.id,
      title: session.title
    })))
  }, [sessions]);

  const addClick = title => {
    SessionsService.createSession({events: [], closed: false, title}).then(() => {
      SessionsService.querySessions().then(sessions => {
        dispatch({type: actionTypes.SET_SESSIONS, sessions})
      })
    })
  };

  const deleteClick = ({id}) => {
    SessionsService.deleteSession(id).then(user => {
      SessionsService.querySessions().then(sessions => {
        dispatch({type: actionTypes.SET_SESSIONS, sessions})
      })
    })
  };

  const titleClick = item => {
    SessionsService.getSession(item.id).then(session => {
      dispatch({type: actionTypes.SET_SELECTED_SESSION, session})
    })
  };

  return (
    <EditableList items={listItems}
                  deleteClick={deleteClick}
                  titleClick={titleClick}
                  addClick={addClick}
                  addPlaceholder={'New session'}/>
  )
}

export default SessionsEditableList
