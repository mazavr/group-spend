import React from 'react';
import {observer} from 'mobx-react';
import EditableList from '../../components/EditableList/EditableList';
import SessionEvent from '../../stores/SessionEvent';
import ListItem from '../../models/ListItem';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';
import ValidationRule, {validationRuleTypes} from '../../validation/ValidationRule';
import {useStore} from '../../App/AppContext';

export default observer(function EventList({session}) {
  const {shellStore, modalDialogStore} = useStore();

  const eventValidationRules = {
    title: {
      [validationRuleTypes.REQUIRED]: 'Title is required',
      [validationRuleTypes.NOT_ONLY_WHITESPACES]: 'Title is empty',
      unique: new ValidationRule({
        message: 'Already exists',
        validate: title => !session.events.find(event => event.title === title)
      })
    }
  };

  const eventListItems = session.events.map(event => new ListItem({
    id: event.id,
    title: event.title,
    hint: event.closed ? '(closed)' : '',
    tag: event
  }));

  const deleteClick = ({id, tag: {title}}) => {
    modalDialogStore.show(new ModalDialog({
      header: `Delete event "${title}"?`,
      body: 'Operation can\'t be undone',
      type: dialogTypes.CONFIRM,
      okClick: () => session.removeEvent(id)
    }))
  };

  const titleClick = ({id}) => {
    shellStore.setSelectedSessionEventId(id);
  };

  const addEventClick = title => {
    session.addEvent(new SessionEvent({title}));
  };

  const sortEvents = (indFrom, indTo) => {
    session.moveEvent(indFrom, indTo);
  };

  return (
    <div className={'v-list'}>
      <div className={'v-list__item'}>
        <h5>Session events ({eventListItems.length}):</h5>
      </div>
      <div className={'v-list__item'}>
        <EditableList items={eventListItems}
                      deleteClick={deleteClick}
                      titleClick={titleClick}
                      addClick={addEventClick}
                      isSortable={true}
                      sort={sortEvents}
                      addPlaceholder={'New event'}
                      validationRules={eventValidationRules}/>
      </div>
    </div>
  )
});
