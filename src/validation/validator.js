export const validate = (model, modelValidationRules, propsArray) => {
  let errors = {};

  propsArray.forEach(propNameToValidate => {
    let propRules = modelValidationRules[propNameToValidate];
    Object.entries(propRules).forEach(([ruleKey, rule]) => {
      if (!rule.validate.call(model, model[propNameToValidate])) {
        errors[propNameToValidate] = errors[propNameToValidate] || {};
        errors[propNameToValidate][ruleKey] = rule.message;
      }
    })
  });

  return Object.keys(errors).length === 0 ? undefined : errors;
};
