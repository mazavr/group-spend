import id from '../utils/id';

export default function SessionEvent(props = {}) {
  this.id = props.id || id();
  this.title = props.title || '';
  this.payments = props.payments || [];
  this.closed = props.closed || false;
  this.amount = props.amount || 0;
}
