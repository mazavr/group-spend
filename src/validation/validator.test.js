import {validate} from './validator'

describe('validate', () => {
  it('returns undefined on success validation', () => {
    const model = {title: 'asdf'};
    const rules = {title: {required: {validate: () => true}}};
    const fields = ['title'];
    expect(validate(model, rules, fields)).toBe(undefined);
  });
  it('returns message on validation fail', () => {
    const model = {title: 'asdf'};
    const rules = {title: {required: {validate: () => false, message: 'failed'}}};
    const fields = ['title'];
    expect(validate(model, rules, fields)).toEqual({title: {required: 'failed'}});
  });
  it('returns messages on field validation fail', () => {
    const model = {title: 'asdf'};
    const rules = {title: {
      required1: {validate: () => false, message: 'failed1'},
      required2: {validate: () => false, message: 'failed2'}
    }};
    const fields = ['title'];
    expect(validate(model, rules, fields)).toEqual({title: {required1: 'failed1', required2: 'failed2'}});
  });
  it('validates if field is not presented in model', () => {
    const model = {};
    const rules = {title: {required: {validate: () => false, message: 'failed'}}};
    const fields = ['title'];
    expect(validate(model, rules, fields)).toEqual({title: {required: 'failed'}});
  });
});
