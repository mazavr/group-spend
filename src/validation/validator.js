import ValidationRule from './ValidationRule';

function parseShortRuleDefinition([ruleKey, rule]) {
  if (typeof rule === 'string') {
    return {
      ruleKey,
      rule: new ValidationRule({
        message: rule,
        type: ruleKey
      })
    }
  }

  return {ruleKey, rule};
}

export const validate = (model, modelValidationRules, propsArray) => {
  let errors = {};

  propsArray.forEach(propNameToValidate => {
    let propRules = modelValidationRules[propNameToValidate];
    Object.entries(propRules).forEach(ruleEntry => {
      const {ruleKey, rule} = parseShortRuleDefinition(ruleEntry);

      if (!rule.validate.call(model, model[propNameToValidate])) {
        errors[propNameToValidate] = errors[propNameToValidate] || {};
        errors[propNameToValidate][ruleKey] = rule.message;
      }
    })
  });

  return Object.keys(errors).length === 0 ? undefined : errors;
};
