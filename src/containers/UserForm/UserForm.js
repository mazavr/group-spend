import React from 'react';
import {setSelectedUserId} from '../../store/globalActions';
import {updateUser as updateUserAction} from '../../store/usersActions';
import TitleForm from '../../components/TitleForm';
import ValidationRule, {validationRuleTypes} from '../../validation/ValidationRule';

function UserForm({selectedUserId, users, dispatch}) {
  const originalUser = users.find(user => user.id === selectedUserId);

  const validationRules = {
    title: {
      [validationRuleTypes.REQUIRED]: 'Name is required',
      [validationRuleTypes.NOT_ONLY_WHITESPACES]: 'Name is empty',
      unique: new ValidationRule({
        message: 'User with the same name already exists',
        validate: name => originalUser.name === name || !users.find(u => u.name === name)
      })
    }
  };

  const cancel = () => {
    dispatch(setSelectedUserId(null));
  };

  const updateUser = name => {
    dispatch(updateUserAction({...originalUser, name}));
    dispatch(setSelectedUserId(null));
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
}

export default React.memo(UserForm);
