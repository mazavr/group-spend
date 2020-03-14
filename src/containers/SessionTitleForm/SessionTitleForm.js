import React from 'react';
import TitleForm from '../../components/TitleForm';
import ValidationRule, {validationRuleTypes} from '../../validation/ValidationRule';

function SessionTitleForm({session: originalSession, onSave, onCancel, sessions}) {
  const validationRules = {
    title: {
      [validationRuleTypes.REQUIRED]: 'Title is required',
      [validationRuleTypes.NOT_ONLY_WHITESPACES]: 'Title is empty',
      unique: new ValidationRule({
        message: 'Already exists',
        validate: title => originalSession.title === title || !sessions.find(session => session.title === title)
      })
    }
  };

  return (
    <TitleForm title={originalSession.title}
               validationRules={validationRules}
               onCancel={onCancel}
               onSubmit={onSave}/>
  )
}

export default SessionTitleForm
