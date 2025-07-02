const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      fs.writeFileSync('senal.txt', body);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Señal recibida');
    });
  } else {
    res.writeHead(404);
    res.end('Solo POST');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});
