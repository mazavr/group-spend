import {action, observable, decorate, computed} from 'mobx';
import User from './User';

function sortByName(o1, o2) {
  const name1 = o1.name.toLowerCase();
  const name2 = o2.name.toLowerCase();

  if (name1 < name2) {
    return -1;
  }
  if (name1 > name2) {
    return 1;
  }
  return 0;
}

class UserStore {
  users = [];

  constructor({rootStore}) {
    this.rootStore = rootStore;
  }

  add(user) {
    this.users.push(user);
  }

  remove(id) {
    this.users.replace(
      this.users.filter(user => user.id !== id)
    )
  }

  loadUsers(users) {
    this.users.replace(
      users.map(u => new User(u))
    )
  }

  get sortedUsers() {
    return this.users.slice().sort(sortByName);
  }
}

decorate(UserStore, {
  users: observable,
  add: action,
  remove: action,
  sortedUsers: computed
});

export default UserStore;
