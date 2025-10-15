
const { onRequest } = require('firebase-functions/v2/https');
const { default: next } = require('next');

const isDev = process.env.NODE_ENV !== 'production';

const server = next({
  dev: isDev,
  // next's server directory is detected in the firebase function's root directory
  conf: { distDir: '.next' },
});

const nextjsHandle = server.getRequestHandler();

exports.nextServer = onRequest({ secrets: [] }, (req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});
