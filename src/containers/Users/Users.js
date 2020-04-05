import React from 'react';
import UserForm from '../UserForm';
import UsersEditableList from '../UsersEditableList';
import {useStore} from '../../App/AppContext';
import {observer} from "mobx-react";

export default observer(function Users() {
  const {shellStore} = useStore();

  return shellStore.selectedUserId
    ? <UserForm/>
    : <UsersEditableList/>
});
