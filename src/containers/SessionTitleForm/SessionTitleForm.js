import React, {useContext} from 'react';
import {globalContext} from '../../store/globalReducer';
import TitleForm from '../../components/TitleForm';

function SessionTitleForm({session: originalSession, onSave, onCancel}) {
  const [{sessions}] = useContext(globalContext);

  const validationRules = {
    title: {
      required: {
        message: 'Field is required',
        validate: title => !!title
      },
      unique: {
        message: 'Already exists',
        validate: title => originalSession.title === title || !sessions.find(session => session.title === title)
      }
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
