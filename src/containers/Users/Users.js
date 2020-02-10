import React, {useContext} from 'react';
import {globalContext} from '../../store/globalReducer';
import UserForm from '../UserForm';
import UsersEditableList from '../UsersEditableList';

function Users() {
  const [{selectedUserId}] = useContext(globalContext);

  return selectedUserId
    ? <UserForm/>
    : <UsersEditableList/>
}

export default Users
