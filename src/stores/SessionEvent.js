import {action, decorate, isObservable, observable} from 'mobx';
import id from '../utils/id';
import Payment from './Payment';
import {recalculatePaymentsTotalAmount} from "../utils/payment";
import {moveInArray} from "../utils/array";

class SessionEvent {
  id = null;
  title = '';
  closed = false;
  amount = 0;
  payments = [];

  constructor(props = {}) {
    this.id = props.id || id();
    this.title = props.title || '';
    this.closed = props.closed || false;
    this.amount = props.amount || 0;

    this.payments = props.payments || [];
  }

  load(eventJson) {
    console.log(isObservable(eventJson))
    this.id = eventJson.id;
    this.title = eventJson.title;
    this.closed = eventJson.closed;
    this.amount = eventJson.amount;

    this.payments.replace(
      eventJson.payments.map(paymentJson => new Payment(paymentJson))
    )
  }

  setTitle(title) {
    this.title = title;
  }

  setAmount(amount) {
    this.amount = amount;
  }

  addPayment(payment) {
    this.payments.push(payment)
  }

  recalculatePaymentsTotalAmount() {
    recalculatePaymentsTotalAmount(this)
  }

  removePayment(id) {
    this.payments.replace(
      this.payments.filter(payment => payment.id !== id)
    )
  }

  movePayment(indFrom, indTo) {
    this.payments.replace(
      moveInArray(this.payments, indFrom, indTo)
    );
  }

  setClosed(closed) {
    this.closed = closed;
  }
}

decorate(SessionEvent, {
  id: observable,
  title: observable,
  closed: observable,
  amount: observable,
  payments: observable,
  load: action,
  setTitle: action,
  setAmount: action,
  addPayment: action,
  recalculatePaymentsTotalAmount: action,
  removePayment: action,
  movePayment: action,
  setClosed: action
});

export default SessionEvent;
