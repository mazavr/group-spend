import id from '../utils/id';

export default function Session(props = {}) {
  this.id = props.id || id();
  this.title = props.title || '';
  this.closed = props.closed || false;
  this.events = props.events || [];
}
