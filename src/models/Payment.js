import id from '../utils/id';

export default function Payment(props = {}) {
  this.id = props.id || id();
  this.userId = props.userId || null;
  this.amount = props.amount || 0;
  this.totalAmount = props.totalAmount || 0;
  this.isCustomTotal = false;
}
