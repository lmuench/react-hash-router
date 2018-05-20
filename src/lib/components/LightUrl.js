const LightUrl = {};

LightUrl.getSegments = () => {
  const path = LightUrl.getFragment();
  return LightUrl.extractSegments(path);
}

LightUrl.extractSegments = path => {
  let segments = path.split('?')[0];
  segments = segments.split('/').slice(1);
  return segments;
}

LightUrl.getQueries = () => {
  const path = LightUrl.getFragment();
  return LightUrl.extractQueries(path);
}

LightUrl.extractQueries = path => {
  let queries = path.split('?')[1];
  queries = queries ? queries.split('&') : [];
  queries = queries.map(querie => querie.split('='));
  return queries;
}

LightUrl.getFragment = () => {
  return window.location.hash;
}

export default LightUrl;