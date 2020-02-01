import {getRequiredTransfers} from './payment';

describe('getRequiredTransfers', () => {
  it('works with one item', () => {
    let array = [{key: 1, balance: 0}];
    expect(getRequiredTransfers(array)).toEqual([]);
  });
  it('works with 2 items', () => {
    let array = [{key: 1, balance: -100}, {key: 2, balance: 100}];
    expect(getRequiredTransfers(array)).toEqual([{from: 1, to: 2, amount: 100}]);
  });
  it('works with one positive balance and many equal negative', () => {
    let array = [{key: 1, balance: -100}, {key: 2, balance: 200}, {key: 3, balance: -100}];
    expect(getRequiredTransfers(array)).toEqual([{from: 1, to: 2, amount: 100}, {from: 3, to: 2, amount: 100}]);
  });
  it('works with many positive and negative', () => {
    let array = [
      {key: 1, balance: 300},
      {key: 2, balance: 200},
      {key: 3, balance: -250},
      {key: 4, balance: -250}
    ];
    expect(getRequiredTransfers(array)).toEqual([
      {from: 3, to: 1, amount: 250},
      {from: 4, to: 1, amount: 50},
      {from: 4, to: 2, amount: 200}
    ]);
  });
  it('works with many positive and negative (duplicated negative keys)', () => {
    let array = [
      {key: 1, balance: 300},
      {key: 2, balance: 200},
      {key: 3, balance: -250},
      {key: 4, balance: -50},
      {key: 4, balance: -200}
    ];
    expect(getRequiredTransfers(array)).toEqual([
      {from: 3, to: 1, amount: 250},
      {from: 4, to: 1, amount: 50},
      {from: 4, to: 2, amount: 200}
    ]);
  });
  it('works with many positive and negative (duplicated positive keys)', () => {
    let array = [
      {key: 1, balance: 200},
      {key: 1, balance: 100},
      {key: 2, balance: 200},
      {key: 3, balance: -250},
      {key: 4, balance: -250}
    ];
    expect(getRequiredTransfers(array)).toEqual([
      {from: 3, to: 1, amount: 250},
      {from: 4, to: 1, amount: 50},
      {from: 4, to: 2, amount: 200}
    ]);
  });
  it('works with many positive and negative (duplicated positive and negative keys)', () => {
    let array = [
      {key: 1, balance: 200},
      {key: 1, balance: 100},
      {key: 2, balance: 200},
      {key: 3, balance: -250},
      {key: 4, balance: -50},
      {key: 4, balance: -200}
    ];
    expect(getRequiredTransfers(array)).toEqual([
      {from: 3, to: 1, amount: 250},
      {from: 4, to: 1, amount: 50},
      {from: 4, to: 2, amount: 200}
    ]);
  });
  it('works with no need to calculate', () => {
    let array = [
      {key: 1, balance: 200},
      {key: 2, balance: 200},
      {key: 1, balance: -100},
      {key: 2, balance: -200},
      {key: 1, balance: -100}
    ];
    expect(getRequiredTransfers(array)).toEqual([]);
  });
});

