import React, {useContext, useMemo} from 'react';
import {globalContext} from '../../store/globalReducer';
import {
  createSession,
  deleteSession as deleteSessionAction,
  setSelectedSessionId,
  showDialog
} from '../../store/globalActions';
import EditableList from '../../components/EditableList';
import ListItem from '../../models/ListItem';
import Session from '../../models/Session';
import id from '../../utils/id';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';

function SessionsEditableList() {
  const [{sessions}, dispatch] = useContext(globalContext);

  const sessionValidationRules = {
    title: {
      required: {
        message: 'Title is required',
        validate: title => !!title
      },
      unique: {
        message: 'Already exists',
        validate: title => !sessions.find(session => session.title === title)
      }
    }
  };

  const listItems = useMemo(() => {
    return sessions.map(session => new ListItem({
      id: session.id,
      title: `${session.title} ${session.closed ? ' (closed)' : ''}`,
      tag: session
    }))
  }, [sessions]);

  const addSession = title => {
    dispatch(createSession(new Session({title, id: id()})));
  };

  const deleteSession = ({id, tag: {title}}) => {
    dispatch(showDialog(new ModalDialog({
      header: `Delete session "${title}"?`,
      body: 'Operation can\'t be undone',
      type: dialogTypes.CONFIRM,
      okClick: () => dispatch(deleteSessionAction(id))
    })))
  };

  const openSession = item => {
    dispatch(setSelectedSessionId(item.id));
  };

  return (
    <EditableList items={listItems}
                  deleteClick={deleteSession}
                  titleClick={openSession}
                  addClick={addSession}
                  addPlaceholder={'New session'}
                  validationRules={sessionValidationRules}/>
  )
}

export default SessionsEditableList;
