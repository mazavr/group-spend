import React from 'react';
import {setSelectedSessionId} from '../../store/globalActions';
import {createSession, deleteSession as deleteSessionAction, updateSessions} from '../../store/sessionsActions';
import {showDialog} from '../../store/modalDialogsActions';
import EditableList from '../../components/EditableList';
import ListItem from '../../models/ListItem';
import Session from '../../models/Session';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';
import {moveInArray} from '../../utils/array';
import ValidationRule, {validationRuleTypes} from '../../validation/ValidationRule';

function SessionsEditableList({sessions, dispatch}) {
  const sessionValidationRules = {
    title: {
      [validationRuleTypes.REQUIRED]: 'Title is required',
      [validationRuleTypes.NOT_ONLY_WHITESPACES]: 'Title is empty',
      unique: new ValidationRule({
        message: 'Already exists',
        validate: title => !sessions.find(session => session.title === title)
      })
    }
  };

  const sessionListItems = sessions.map(session => new ListItem({
    id: session.id,
    title: session.title,
    tag: session,
    hint: session.closed ? '(closed)' : ''
  }));

  const addSession = title => {
    dispatch(createSession(new Session({title})));
  };

  const sortSessions = (indFrom, indTo) => {
    dispatch(updateSessions(moveInArray(sessions, indFrom, indTo)));
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
    <EditableList items={sessionListItems}
                  sort={sortSessions}
                  isSortable={true}
                  deleteClick={deleteSession}
                  titleClick={openSession}
                  addClick={addSession}
                  addPlaceholder={'New session'}
                  validationRules={sessionValidationRules}/>
  )
}

export default React.memo(SessionsEditableList);
