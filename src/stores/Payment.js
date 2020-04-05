import {action, decorate, observable} from 'mobx';
import id from '../utils/id';

class Payment {
  id = null;
  userId = null;
  amount = 0;
  totalAmount = 0;
  isCustomTotal = false;

  constructor(props = {}) {
    this.id = props.id || id();
    this.userId = props.userId || null;
    this.amount = props.amount || 0;
    this.totalAmount = props.totalAmount || 0;
    this.isCustomTotal = false;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  setIsCustomTotal(isCustomTotal) {
    this.isCustomTotal = isCustomTotal;
  }

  setAmount(amount) {
    this.amount = amount;
  }

  setTotalAmount(titalAmount) {
    this.totalAmount = titalAmount;
  }
}

decorate(Payment, {
  id: observable,
  userId: observable,
  amount: observable,
  totalAmount: observable,
  isCustomTotal: observable,
  setUserId: action,
  setIsCustomTotal: action,
  setAmount: action,
  setTotalAmount: action
});

export default Payment;
