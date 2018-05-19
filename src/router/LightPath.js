const LightPath = {};

LightPath.getSegments = () => {
  const path = LightPath.getFragment();
  return LightPath.extractSegments(path);
}

LightPath.extractSegments = path => {
  let segments = path.split('?')[0];
  segments = segments.split('/').slice(1);
  return segments;
}

LightPath.getQueries = () => {
  const path = LightPath.getFragment();
  return LightPath.extractQueries(path);
}

LightPath.extractQueries = path => {
  let queries = path.split('?')[1];
  queries = queries ? queries.split('&') : [];
  queries = queries.map(querie => querie.split('='));
  return queries;
}

LightPath.getFragment = () => {
  return window.location.hash;
}

export default LightPath;