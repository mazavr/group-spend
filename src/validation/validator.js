export const validate = (propsArray, modelRules, model) => {
  let newErrors = {};

  propsArray.forEach(propName => {
    let propRules = modelRules[propName];
    Object.keys(propRules).forEach(ruleKey => {
      if (!propRules[ruleKey].validate.call(model, model[propName])) {
        newErrors[propName] = newErrors[propName] || {};
        newErrors[propName][ruleKey] = propRules[ruleKey].message;
      }
    })
  });

  return Object.keys(newErrors).length === 0 ? undefined : newErrors;
};
