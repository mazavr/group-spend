import React, {useContext, useMemo} from 'react';
import {globalContext} from '../../store/globalReducer';
import {createSession, deleteSession as deleteSessionAction, setSelectedSessionId} from '../../store/globalActions';
import EditableList from '../../components/EditableList';
import ListItem from '../../models/ListItem';
import Session from '../../models/Session';
import id from '../../utils/id';

function SessionsEditableList() {
  const [{sessions}, dispatch] = useContext(globalContext);

  const listItems = useMemo(() => {
    return sessions.map(session => new ListItem({
      id: session.id,
      title: session.title
    }))
  }, [sessions]);

  const addSession = title => {
    dispatch(createSession(new Session({title, id: id()})));
  };

  const deleteSession = ({id}) => {
    dispatch(deleteSessionAction(id));
  };

  const openSession = item => {
    dispatch(setSelectedSessionId(item.id));
  };

  return (
    <EditableList items={listItems}
                  deleteClick={deleteSession}
                  titleClick={openSession}
                  addClick={addSession}
                  addPlaceholder={'New session'}/>
  )
}

export default SessionsEditableList
