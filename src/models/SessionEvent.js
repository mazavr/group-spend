export default function SessionEvent(props) {
  this.id = props.id || null;
  this.title = props.title || '';
  this.payments = props.payments || [];
  this.closed = props.closed || false;
  this.amount = props.amount || 0;
}
