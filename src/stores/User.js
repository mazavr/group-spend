import {action, decorate, observable} from 'mobx';
import id from '../utils/id';

class User {
  id = null;
  name = '';

  constructor(props) {
    this.id = props.id || id();
    this.name = props.name || '';
  }

  setName(name) {
    this.name = name;
  }
}

decorate(User, {
  id: observable,
  name: observable,
  setName: action
});

export default User;
