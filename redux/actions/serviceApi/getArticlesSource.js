import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const getArticlesSource = ({
  source,
  domain,
  category,
  country,
  region,
  lang,
  search,
  from,
  to,
  page_number,
  time
}) => {
  const action = createAction('GET_SOURCES_ARTICLES');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      data: {
        source,
        domain,
        category,
        country,
        region,
        lang,
        search,
        from,
        to,
        page_number,
        time
      },
      pageNumber: page_number,
      method: 'POST',
      headers: buildHeaders(state),
      url: `${payload}/search`
    };

    dispatch(action({ request }));
  };
};
