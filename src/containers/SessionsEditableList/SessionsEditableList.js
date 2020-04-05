import React from 'react';
import {observer} from "mobx-react";
import EditableList from '../../components/EditableList';
import ListItem from '../../models/ListItem';
import Session from '../../stores/Session';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';
import ValidationRule, {validationRuleTypes} from '../../validation/ValidationRule';
import {useStore} from '../../App/AppContext';

export default observer(function SessionsEditableList() {
  const {sessionStore, modalDialogStore, shellStore} = useStore();

  const sessionValidationRules = {
    title: {
      [validationRuleTypes.REQUIRED]: 'Title is required',
      [validationRuleTypes.NOT_ONLY_WHITESPACES]: 'Title is empty',
      unique: new ValidationRule({
        message: 'Already exists',
        validate: title => !sessionStore.sessions.find(session => session.title === title)
      })
    }
  };

  const sessionListItems = sessionStore.sessions.map(session => new ListItem({
    id: session.id,
    title: session.title,
    tag: session,
    hint: session.closed ? '(closed)' : ''
  }));

  const addSession = title => {
    sessionStore.addSession(new Session({title}));
  };

  const sortSessions = (indFrom, indTo) => {
    sessionStore.moveSession(indFrom, indTo);
  };

  const deleteSession = ({id, tag: {title}}) => {
    modalDialogStore.show(new ModalDialog({
      header: `Delete session "${title}"?`,
      body: 'Operation can\'t be undone',
      type: dialogTypes.CONFIRM,
      okClick: () => sessionStore.removeSession(id)
    }))
  };

  const openSession = item => {
    shellStore.setSelectedSessionId(item.id);
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
})
