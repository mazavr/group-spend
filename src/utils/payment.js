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
    const newBalance = m.has(c.key)
      ? m.get(c.key) + c.balance
      : c.balance;

    if (newBalance === 0) {
      m.delete(c.key);
    } else {
      m.set(c.key, newBalance);
    }

    return m;
  }, new Map());

  if (inputItemsMap.size === 0) {
    return [];
  }

  let transactions = new Array(inputItemsMap.size - 1);
  let transactionInd = 0;

  while (inputItemsMap.size) {
    let negativeBalanceItem = null;
    let positiveBalanceItem = null;

    for (const [key, balance] of inputItemsMap) {
      if (balance < 0 && !negativeBalanceItem) {
        negativeBalanceItem = {key, balance};
      } else if (balance > 0 && !positiveBalanceItem) {
        positiveBalanceItem = {key, balance};
      }
      if (positiveBalanceItem && negativeBalanceItem) {
        break;
      }
    }

    let minTransactionValue = Math.min(-negativeBalanceItem.balance, positiveBalanceItem.balance);

    negativeBalanceItem.balance += minTransactionValue;
    positiveBalanceItem.balance -= minTransactionValue;

    transactions[transactionInd++] = new TransferItem({
      from: negativeBalanceItem.key,
      to: positiveBalanceItem.key,
      amount: minTransactionValue
    });

    if (negativeBalanceItem.balance === 0) {
      inputItemsMap.delete(negativeBalanceItem.key)
    } else {
      inputItemsMap.set(negativeBalanceItem.key, negativeBalanceItem.balance)
    }

    if (positiveBalanceItem.balance === 0) {
      inputItemsMap.delete(positiveBalanceItem.key)
    } else {
      inputItemsMap.set(positiveBalanceItem.key, positiveBalanceItem.balance)
    }
  }

  return transactions;
}

export function recalculatePaymentsTotalAmount(event) {
  let amountToSplit = event.amount;
  let usersCountToSplit = 0;

  event.payments.forEach(payment => {
    if (payment.isCustomTotal) {
      amountToSplit -= payment.totalAmount;
    } else {
      usersCountToSplit++;
    }
  });

  if (usersCountToSplit === 0) {
    return event;
  }

  let equalPart = Math.floor(amountToSplit / usersCountToSplit);
  let restPart = amountToSplit % usersCountToSplit;

  event.payments.forEach(p => {
    if (!p.isCustomTotal) {
      p.totalAmount = equalPart;
      if (restPart > 0) {
        p.totalAmount++;
        restPart--;
      }
      p.totalAmount = Math.max(p.totalAmount, 0);
    }
  });

  return event;
}
