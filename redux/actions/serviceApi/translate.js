import { createAction } from 'redux-actions';

export const changeLanguage = (language) => {
  const action = createAction('CHANGE_LANGUAGE');

  return (dispatch, getState) => {
    const { language: { data: currentLanguage } } = getState();

    if (language === currentLanguage) return;
    
    dispatch(action(language));
  };
};
