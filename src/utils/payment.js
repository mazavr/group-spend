export function TransferInputItem(props) {
  this.key = props.key;
  this.balance = props.balance;
}

export function TransferItem(props) {
  this.from = props.from;
  this.to = props.to;
  this.amount = props.amount;
}

export function getRequiredTransfers(inputItems) {
  let inputItemsMap = inputItems.reduce((m, c) => {
    if (!m.has(c.key)) {
      m.set(c.key, c.balance)
    } else {
      m.set(c.key, m.get(c.key) + c.balance)
    }
    return m;
  }, new Map());

  let transactions = [];  // todo: performance

  let items = (new Array(...inputItemsMap))
    .filter(i => i[1] !== 0)
    .map(item => ({key: item[0], balance: item[1]}));

  while (items.length > 0) {
    let negative = items.find(i => i.balance < 0);
    let positive = items.find(i => i.balance > 0);

    let minTransactionValue = Math.min(-negative.balance, positive.balance);

    negative.balance += minTransactionValue;
    positive.balance -= minTransactionValue;

    transactions.push(new TransferItem({
      from: negative.key,
      to: positive.key,
      amount: minTransactionValue
    }));

    items = items.filter(i => i.balance !== 0) // todo: performance
  }

  return transactions
}

export function recalculatePaymentsTotalAmount(event) {
  let customTotalPayments = event.payments.filter(p => p.isCustomTotal).length;
  let equalTotalPayment = event.payments.length - customTotalPayments;

  let amountToSplit = event.amount - event.payments.reduce((p, c) => {
    return c.isCustomTotal ? p + c.totalAmount : p;
  }, 0);

  let equalPart = equalTotalPayment === 0
    ? 0
    : Math.floor(amountToSplit / equalTotalPayment);

  let rest = amountToSplit - equalPart * equalTotalPayment;

  event.payments.filter(p => !p.isCustomTotal).forEach(p => {
    p.totalAmount = equalPart;
    if (rest-- > 0) {
      p.totalAmount++;
    }
    p.totalAmount = Math.max(p.totalAmount, 0);
  });

  return event;
}
