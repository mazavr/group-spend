import React from 'react';
import {setSelectedUserId, updateUser as updateUserAction} from '../../store/globalActions';
import TitleForm from '../../components/TitleForm';

function UserForm({selectedUserId, users, dispatch}) {
  const originalUser = users.find(user => user.id === selectedUserId);

  const validationRules = {
    title: {
      required: {
        message: 'User name is required',
        validate: name => !!name
      },
      unique: {
        message: 'User with the same name already exists',
        validate: name => originalUser.name === name || !users.find(u => u.name === name)
      }
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
