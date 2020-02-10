export default function Session(props) {
  this.id = props.id || null;
  this.title = props.title || '';
  this.closed = props.closed || false;
  this.events = props.events || [];
}
