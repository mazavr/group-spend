import React, {useContext, useMemo} from 'react';
import {globalContext} from '../../store/globalReducer';
import {
  createUser,
  deleteUser as deleteUserAction,
  setSelectedUserId
} from '../../store/globalActions';
import EditableList from '../../components/EditableList';
import ListItem from '../../models/ListItem';
import User from '../../models/User';
import id from '../../utils/id';

function UsersEditableList() {
  const [{users, sessions}, dispatch] = useContext(globalContext);

  const userValidationRules = {
    title: {
      required: {
        message: 'Field is required',
        validate: name => !!name
      },
      unique: {
        message: 'Already exists',
        validate: name => !users.find(user => user.name === name)
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
    dispatch(deleteUserAction(id));
  };

  const openUser = item => {
    dispatch(setSelectedUserId(item.id));
  };

  return (
    <EditableList items={userListItems}
                  deleteClick={deleteUser}
                  titleClick={openUser}
                  addClick={addUser}
                  addPlaceholder={'New friend'}
                  validationRules={userValidationRules}/>
  )
}

export default UsersEditableList;
