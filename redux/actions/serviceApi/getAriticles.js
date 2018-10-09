import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const getArticles = ({
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
  time,
  sourcetype
}) => {
  const action = createAction('GET_ARTICLES');

  return (dispatch, getState) => {
    const state = getState();

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
        time,
        sourcetype
      },
      method: 'POST',
      headers: buildHeaders(state),
      url: '/search/aggs'
    };

    dispatch(action({ request }));
  };
};
