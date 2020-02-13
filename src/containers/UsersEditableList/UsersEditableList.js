import React, {useContext, useMemo} from 'react';
import {globalContext} from '../../store/globalReducer';
import {createUser, deleteUser as deleteUserAction, setSelectedUserId, showDialog} from '../../store/globalActions';
import EditableList from '../../components/EditableList';
import ListItem from '../../models/ListItem';
import User from '../../models/User';
import id from '../../utils/id';
import ModalDialog, {dialogTypes} from '../../models/ModalDialog';

function UsersEditableList() {
  const [{users, sessions}, dispatch] = useContext(globalContext);

  const userValidationRules = {
    title: {
      required: {
        message: 'Name is required',
        validate: title => !!title
      },
      unique: {
        message: 'Already exists',
        validate: title => !users.find(user => user.name === title)
      }
    },
    onDelete: {
      inUse: {
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
      }
    }
  };

  const userListItems = useMemo(() => {
    return users.map(user => new ListItem({
      id: user.id,
      title: user.name
    }))
  }, [users]);

  const addUser = name => {
    dispatch(createUser(new User({name, id: id()})));
  };

  const deleteUser = ({id}) => {
    dispatch(showDialog(new ModalDialog({
      header: 'Delete user?',
      body: 'He is not used by any events and can be safely deleted.',
      type: dialogTypes.CONFIRM,
      okClick: () => dispatch(deleteUserAction(id))
    })))
  };

  const openUser = item => {
    dispatch(setSelectedUserId(item.id));
  };

  const deleteFail = () => {
    dispatch(showDialog(new ModalDialog({
      header: 'Can\'t delete user',
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

export default UsersEditableList;
