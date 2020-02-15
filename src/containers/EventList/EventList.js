import React, {useContext, useMemo} from 'react';
import {globalContext} from '../../store/globalReducer';
import {createSessionEvent, deleteSessionEvent, setSelectedSessionEventId, showDialog} from '../../store/globalActions';
import EditableList from '../../components/EditableList/EditableList';
import SessionEvent from '../../models/SessionEvent';
import ListItem from '../../models/ListItem';
import id from '../../utils/id';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';

function EventList({session}) {
  const [, dispatch] = useContext(globalContext);

  const eventValidationRules = {
    title: {
      required: {
        message: 'Title is required',
        validate: title => !!title
      },
      unique: {
        message: 'Already exists',
        validate: title => !session.events.find(event => event.title === title)
      }
    }
  };

  const listItems = useMemo(() => {
    return session.events.map(event => new ListItem({
      id: event.id,
      title: `${event.title} ${event.closed ? ' (closed)' : ''}`,
      tag: event
    }))
  }, [session]);

  const deleteClick = ({id, tag: {title}}) => {
    dispatch(showDialog(new ModalDialog({
      header: `Delete event "${title}"?`,
      body: 'Operation can\'t be undone',
      type: dialogTypes.CONFIRM,
      okClick: () => dispatch(deleteSessionEvent(session.id, id))
    })))
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
                      addPlaceholder={'New event'}
                      validationRules={eventValidationRules}/>
      </div>
    </div>
  )
}

export default EventList;
