export const validationRuleTypes = {
  CUSTOM: 'CUSTOM',
  REQUIRED: 'REQUIRED',
  NOT_ONLY_WHITESPACES: 'NOT_ONLY_WHITESPACES',
  NOT_NEGATIVE: 'NOT_NEGATIVE'
};

const predefinedValidateFunctions = {
  [validationRuleTypes.REQUIRED]: value => !!value,
  [validationRuleTypes.NOT_ONLY_WHITESPACES]: value => !!value.trim(),
  [validationRuleTypes.NOT_NEGATIVE]: value => value >= 0
};

export default function ValidationRule(props = {}) {
  this.message = props.message;
  this.validate = props.validate;
  this.type = props.type || validationRuleTypes.CUSTOM;

  if (this.type !== validationRuleTypes.CUSTOM && this.validate) {
    throw new Error('Validation rule: Using of type != CUSTOM and validate property at the same time is prohibited');
  }

  if (this.type !== validationRuleTypes.CUSTOM && !predefinedValidateFunctions[this.type]) {
    throw new Error('Validation rule: Not supported predefined validation type');
  }

  if (this.type !== validationRuleTypes.CUSTOM) {
    this.validate = predefinedValidateFunctions[this.type];
  }
}
