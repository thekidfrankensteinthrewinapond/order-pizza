const host = process.env.NODE_ENV === 'production' ? ''
  : 'http://localhost:8044';

export {
  host,
  host as apiHost
};
