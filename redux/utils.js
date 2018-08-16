export function buildHeaders(state) {
  const { tokenAccess: { data: { token } } = {} } = state || {};
  const jwtToken = token != null ? `JWT ${token}` : undefined;

  return {
    Accept: 'application/json',
    Authorization: jwtToken,
    'Content-Type': 'application/json'
  };
}
