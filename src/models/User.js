import id from '../utils/id';

export default function User(props = {}) {
  this.id = props.id || id();
  this.name = props.name || '';
}
