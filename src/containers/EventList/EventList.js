import React, {useContext, useMemo} from 'react';
import {globalContext} from '../../store/globalReducer';
import {createSessionEvent, deleteSessionEvent, setSelectedSessionEventId} from '../../store/globalActions';
import EditableList from '../../components/EditableList/EditableList';
import SessionEvent from '../../models/SessionEvent';
import ListItem from '../../models/ListItem';
import id from '../../utils/id';

function EventList({session}) {
  const [, dispatch] = useContext(globalContext);

  const listItems = useMemo(() => {
    return session.events.map(event => new ListItem({
      id: event.id,
      title: `${event.title} ${event.closed ? ' (closed)' : ''}`
    }))
  }, [session]);

  const deleteClick = ({id}) => {
    dispatch(deleteSessionEvent(session.id, id));
  };

  const titleClick = ({id}) => {
    dispatch(setSelectedSessionEventId(id));
  };

  const addEventClick = title => {
    dispatch(createSessionEvent(session.id, new SessionEvent({title, id: id()})));
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
