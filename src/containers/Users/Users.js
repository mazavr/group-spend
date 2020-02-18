import React, {useContext} from 'react';
import {globalContext} from '../../store/globalReducer';
import UserForm from '../UserForm';
import UsersEditableList from '../UsersEditableList';

function Users() {
  const [{selectedUserId, users, sessions}, dispatch] = useContext(globalContext);

  return selectedUserId
    ? <UserForm selectedUserId={selectedUserId}
                users={users}
                dispatch={dispatch}/>
    : <UsersEditableList users={users}
                         sessions={sessions}
                         dispatch={dispatch}/>
}

export default Users
