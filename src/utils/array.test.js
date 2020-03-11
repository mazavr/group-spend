import {moveInArray} from './array';

describe('moveInArray', () => {
  it('works with empty array', () => {
    expect(moveInArray([], 0, 0)).toEqual([]);
  });
  it('swaps 2 length array items', () => {
    expect(moveInArray([1, 2], 0, 1)).toEqual([2, 1]);
  });
  it('works with from > to', () => {
    expect(moveInArray([1, 2, 3, 4, 5], 3, 1)).toEqual([1, 4, 2, 3, 5]);
  });
  it('works with from < to', () => {
    expect(moveInArray([1, 2, 3, 4, 5], 1, 3)).toEqual([1, 3, 4, 2, 5]);
  });
  it('works with from == to', () => {
    expect(moveInArray([1, 2, 3, 4, 5], 3, 3)).toEqual([1, 2, 3, 4, 5]);
  });
  it('does not modify existing array', () => {
    const array = [1, 2, 3];
    moveInArray(array, 1, 1);
    expect(array).toEqual([1, 2, 3]);
  });
  it('returns new array', () => {
    const array = [1, 2, 3];
    const resArray = moveInArray(array, 1, 1);
    expect(array).not.toBe(resArray);
  });
});
