import id from '../utils/id';

export default function ListItem(props = {}) {
  this.id = props.id || id();
  this.title = props.title || '';
  this.tag = props.tag || {};
}
