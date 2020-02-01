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

    transactions.push({
      from: negative.key,
      to: positive.key,
      amount: minTransactionValue
    });

    items = items.filter(i => i.balance !== 0) // todo: performance
  }

  return transactions
}
