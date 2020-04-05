import React from 'react';
import {observer} from 'mobx-react';
import EditableList from '../../components/EditableList';
import ListItem from '../../models/ListItem';
import User from '../../stores/User';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';
import ValidationRule, {validationRuleTypes} from '../../validation/ValidationRule';
import {useStore} from '../../App/AppContext';

export default observer(function UsersEditableList() {
  const {userStore, shellStore, modalDialogStore, sessionStore} = useStore();

  const userValidationRules = {
    title: {
      [validationRuleTypes.REQUIRED]: 'Name is required',
      [validationRuleTypes.NOT_ONLY_WHITESPACES]: 'Name is empty',
      unique: new ValidationRule({
        message: 'Already exists',
        validate: name => !userStore.users.find(user => user.name === name)
      })
    },
    onDelete: {
      inUse: new ValidationRule({
        message: 'Already in use', // todo: use it in error message in ModalDialog
        validate: function validate() {
          return !sessionStore.isUserInSessionUse(this.id);
        }
      })
    }
  };

  const userListItems = userStore.sortedUsers.map(user => new ListItem({ //todo: should be avoided?
    id: user.id,
    title: user.name,
    tag: user
  }));

  const addUser = name => {
    userStore.add(new User({name}));
  };

  const deleteUser = ({id, tag: {name}}) => {
    modalDialogStore.show(new ModalDialog({
      header: `Delete user "${name}"?`,
      body: 'He is not used by any events and can be safely deleted.',
      type: dialogTypes.CONFIRM,
      okClick: () => userStore.remove(id)
    }))
  };

  const openUser = item => {
    shellStore.setSelectedUserId(item.id);
  };

  const deleteFail = ({tag: {name}}, error) => { // todo: use error
    modalDialogStore.show(new ModalDialog({
      header: `Can't delete user "${name}"`,
      body: 'It is used by some of events'
    }))
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
});
