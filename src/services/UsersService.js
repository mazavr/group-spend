import {clone} from '../utils/object';

let users = [];
let userId = 1;

const queryUsers = () => {
  return Promise.resolve(users.map(u => u))
};

const updateUser = (id, user) => {
  let existingUser = users.find(user => user.id === id);
  if (existingUser) {
    Object.assign(existingUser, user);
    return Promise.resolve(clone(existingUser));
  }

  return Promise.reject();
};

const createUser = name => {
  let userToSave = {name, id: userId++};
  users.push(userToSave);
  return Promise.resolve(userToSave)
};

const getUser = id => {
  let foundUser = users.find(user => user.id === id);
  return Promise.resolve(clone(foundUser))
};

const deleteUser = id => {
  users = users.filter(user => user.id !== id);
  return Promise.resolve(id)
};

export default {
  queryUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
}
