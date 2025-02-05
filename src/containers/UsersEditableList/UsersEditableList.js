import React from 'react';
import {createUser, deleteUser as deleteUserAction} from '../../store/usersActions';
import {setSelectedUserId} from '../../store/globalActions';
import {showDialog} from '../../store/modalDialogsActions';
import EditableList from '../../components/EditableList';
import ListItem from '../../models/ListItem';
import User from '../../models/User';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';
import ValidationRule, {validationRuleTypes} from '../../validation/ValidationRule';

function UsersEditableList({users, sessions, dispatch}) {
  const userValidationRules = {
    title: {
      [validationRuleTypes.REQUIRED]: 'Name is required',
      [validationRuleTypes.NOT_ONLY_WHITESPACES]: 'Name is empty',
      unique: new ValidationRule({
        message: 'Already exists',
        validate: name => !users.find(user => user.name === name)
      })
    },
    onDelete: {
      inUse: new ValidationRule({
        message: 'Already in use',
        validate: function validate() {
          let self = this;
          return !sessions.some(session => {
            return session.events.some(event => {
              return event.payments.some(payment => {
                return payment.userId === self.id
              })
            })
          })
        }
      })
    }
  };

  const userListItems = users.map(user => new ListItem({
    id: user.id,
    title: user.name,
    tag: user
  }));

  const addUser = name => {
    dispatch(createUser(new User({name})));
  };

  const deleteUser = ({id, tag: {name}}) => {
    dispatch(showDialog(new ModalDialog({
      header: `Delete user "${name}"?`,
      body: 'He is not used by any events and can be safely deleted.',
      type: dialogTypes.CONFIRM,
      okClick: () => dispatch(deleteUserAction(id))
    })))
  };

  const openUser = item => {
    dispatch(setSelectedUserId(item.id));
  };

  const deleteFail = ({tag: {name}}) => {
    dispatch(showDialog(new ModalDialog({
      header: `Can't delete user "${name}"`,
      body: 'It is used by some of events'
    })))
  };

  return (
    <EditableList items={userListItems}
                  deleteClick={deleteUser}
                  titleClick={openUser}
                  addClick={addUser}
                  addPlaceholder={'New friend'}
                  validationRules={userValidationRules}
                  deleteFail={deleteFail}/>
  )
}

export default React.memo(UsersEditableList);
