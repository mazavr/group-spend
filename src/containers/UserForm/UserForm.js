import React from 'react';
import TitleForm from '../../components/TitleForm';
import ValidationRule, {validationRuleTypes} from '../../validation/ValidationRule';
import {useStore} from '../../App/AppContext';
import {observer} from 'mobx-react';

export default observer(function UserForm() {
  const {userStore, shellStore} = useStore();
  const originalUser = userStore.users.find(user => user.id === shellStore.selectedUserId);

  const validationRules = {
    title: {
      [validationRuleTypes.REQUIRED]: 'Name is required',
      [validationRuleTypes.NOT_ONLY_WHITESPACES]: 'Name is empty',
      unique: new ValidationRule({
        message: 'User with the same name already exists',
        validate: name => originalUser.name === name || !userStore.users.find(u => u.name === name)
      })
    }
  };

  const cancel = () => {
    shellStore.setSelectedUserId(null);
  };

  const updateUser = name => {
    originalUser.setName(name);
    shellStore.setSelectedUserId(null);
  };

  return (
    <div className={'v-list'}>
      <div className={'v-list__item'}>
        <h5>Edit friend</h5>
      </div>
      <div className={'v-list__item'}>
        <TitleForm title={originalUser.name}
                   validationRules={validationRules}
                   onCancel={cancel}
                   onSubmit={updateUser}/>
      </div>
    </div>
  )
})
