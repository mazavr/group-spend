import React, {useContext, useState} from 'react';
import {globalContext} from '../../store/globalReducer';
import {actionTypes} from '../../store/globalActions';
import {clone} from '../../utils/object';
import UsersService from '../../services/UsersService';

function UserForm() {
  const [{selectedUser: user}, dispatch] = useContext(globalContext);
  const [userCopy, setUserCopy] = useState(clone(user));

  const cancel = () => {
    dispatch({type: actionTypes.SET_SELECTED_USER, user: null})
  };

  const saveUser = () => {
    UsersService.updateUser(userCopy.id, userCopy).then(() => {
      UsersService.queryUsers().then(users => {
        dispatch({type: actionTypes.SET_USERS, users});
        dispatch({type: actionTypes.SET_SELECTED_USER, user: null})
      })
    })
  };

  const onUserNameChange = name => {
    setUserCopy({...userCopy, name})
  };

  return (
    <form className={'v-list'} onSubmit={e => {
      saveUser();
      e.preventDefault()
    }}>
      <div className={'v-list__item'}>
        <h4>
          Edit friend
        </h4>
      </div>
      <div className={'v-list__item'}>
        <input className={'base-input'} value={userCopy.name}
               onChange={event => onUserNameChange(event.target.value)}/>
      </div>
      <div className={'v-list__item'}>
        <div className={'h-list h-list--pull-right'}>
          <div className={'h-list__item'}>
            <button type={'button'} className={'base-button base-button--light'} onClick={cancel}>Cancel</button>
          </div>
          <div className={'h-list__item'}>
            <button type={'submit'} className={'base-button base-button--success'}>Save</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default UserForm
