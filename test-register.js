const http = require('http');

const data = JSON.stringify({
  email: 'factor@test.com',
  password: 'Test1234!',
  firstName: 'Factor',
  lastName: 'Admin',
  organizationName: 'Factor Test Organization',
  industry: 'steel-manufacturing'
});

console.log('Sending registration data:', data);

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Response:', body);
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
});

req.write(data);
req.end();
