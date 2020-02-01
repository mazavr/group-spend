import React, {useContext, useEffect, useState} from "react";
import {globalContext} from "../../store/globalReducer";
import {actionTypes} from "../../store/globalActions";
import EditableList from "../../components/EditableList";
import UsersService from "../../services/UsersService";

function UsersEditableList() {
  const [{users}, dispatch] = useContext(globalContext);
  const [listItems, setListItems] = useState([]);
  console.log('UsersEditableList render');
  useEffect(() => {
    console.log('UsersEditableList useEffect');
    setListItems(users.map(u => ({
      id: u.id,
      title: u.name
    })))
  }, [users]);

  const addClick = name => {
    UsersService.createUser(name).then(user => {
      UsersService.queryUsers().then(users => {
        dispatch({type: actionTypes.SET_USERS, users})
      })
    })
  };

  const deleteClick = ({id}) => {
    UsersService.deleteUser(id).then(() => {
      UsersService.queryUsers().then(users => {
        dispatch({type: actionTypes.SET_USERS, users})
      })
    })
  };

  const titleClick = item => {
    UsersService.getUser(item.id).then(user => {
      dispatch({type: actionTypes.SET_SELECTED_USER, user})
    })
  };

  return (
    <EditableList items={listItems}
                  deleteClick={deleteClick}
                  titleClick={titleClick}
                  addClick={addClick}
                  addPlaceholder={'New friend'}/>
  )
}

export default UsersEditableList
