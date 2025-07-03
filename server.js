const http = require('http');
let ultimaSenal = '';

const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      ultimaSenal = body;
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Señal recibida');
    });
  } else if (req.method === 'GET' && req.url === '/ultima-senal') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(ultimaSenal || 'No hay señal');
  } else {
    res.writeHead(404);
    res.end('Solo POST o GET /ultima-senal');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});
