import React, {useContext} from 'react';
import {globalContext} from '../../store/globalReducer';
import UserForm from '../UserForm';
import UsersEditableList from '../UsersEditableList';

function Users() {
  const [{selectedUser}] = useContext(globalContext);

  return selectedUser
    ? <UserForm/>
    : <UsersEditableList/>
}

export default Users
