const utils = {};

utils.extractSegmentsAndQueries = path => {
  const pathAndQuery = path.split('?');
  const segments = pathAndQuery[0].split('/').slice(1);
  let queries = pathAndQuery[1] ? pathAndQuery[1].split('&') : [];
  queries = queries.map(querie => querie.split('='));  // TODO create object instead?
  return { segments, queries };
}

utils.getBrowserPath = () => {
  return window.location.hash;
}

export default utils;