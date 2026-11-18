const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const MIME = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.schem': 'application/octet-stream',
  '.litematic': 'application/octet-stream',
  '.zip': 'application/zip',
  '.txt': 'text/plain; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8'
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Cross-Origin-Opener-Policy': 'same-origin'
};

const safeRoot = path.resolve(__dirname) + path.sep;

const server = http.createServer((req, res) => {
  // 1. Only allow safe HTTP methods
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, Object.assign({
      'Content-Type': 'text/plain; charset=UTF-8',
      'Allow': 'GET, HEAD'
    }, SECURITY_HEADERS));
    res.end('405 Method Not Allowed');
    return;
  }

  // 2. Safe URI decoding with crash prevention
  let reqPath;
  try {
    reqPath = decodeURI(req.url.split('?')[0]);
  } catch (err) {
    res.writeHead(400, Object.assign({
      'Content-Type': 'text/plain; charset=UTF-8'
    }, SECURITY_HEADERS));
    res.end('400 Bad Request: Malformed URI');
    return;
  }

  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  // 3. Strict Path Traversal Protection
  const resolvedPath = path.resolve(path.join(__dirname, reqPath));
  if (!resolvedPath.startsWith(safeRoot) && resolvedPath !== path.resolve(__dirname, 'index.html')) {
    res.writeHead(403, Object.assign({
      'Content-Type': 'text/plain; charset=UTF-8'
    }, SECURITY_HEADERS));
    res.end('403 Forbidden: Access Denied');
    return;
  }

  // 4. File inspection & serving
  fs.stat(resolvedPath, (err, stats) => {
    if (err || !stats.isFile()) {
      const errPath = path.join(__dirname, '404.html');
      fs.readFile(errPath, (err404, data404) => {
        res.writeHead(404, Object.assign({
          'Content-Type': 'text/html; charset=UTF-8'
        }, SECURITY_HEADERS));
        res.end(data404 || '<!DOCTYPE html><html><head><title>404</title></head><body><h1>404 Not Found</h1></body></html>');
      });
      return;
    }

    const ext = path.extname(resolvedPath).toLowerCase();
    const headers = Object.assign({
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': (['.png', '.jpg', '.svg', '.schem', '.litematic', '.ico'].includes(ext)) ? 'public, max-age=3600' : 'no-cache'
    }, SECURITY_HEADERS);

    res.writeHead(200, headers);

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    fs.createReadStream(resolvedPath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`MineVault secure server running at http://localhost:${PORT}/`);
});
