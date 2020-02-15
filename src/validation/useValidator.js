import {useCallback, useState} from 'react';
import {validate as validateModel} from './validator';

export function useValidator(validationRules) {
  const [errors, setErrors] = useState({});

  const validate = useCallback((model, propsArray) => {
    let validationResult = validationRules
      ? validateModel(model, validationRules, propsArray)
      : undefined;
    setErrors(validationResult || {});
    return validationResult === undefined;
  }, [validationRules, setErrors]);

  return {errors, validate, setErrors}
}
