const utils = {};

utils.getSegments = () => {
  const path = utils.getFragment();
  return utils.extractSegments(path);
}

utils.extractSegments = path => {
  let segments = path.split('?')[0];
  segments = segments.split('/').slice(1);
  return segments;
}

utils.getQueries = () => {
  const path = utils.getFragment();
  return utils.extractQueries(path);
}

utils.extractQueries = path => {
  let queries = path.split('?')[1];
  queries = queries ? queries.split('&') : [];
  queries = queries.map(querie => querie.split('='));
  return queries;
}

utils.getFragment = () => {
  return window.location.hash;
}

export default utils;