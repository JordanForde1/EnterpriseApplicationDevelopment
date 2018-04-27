const http = require('http');
const crypto = require ('crypto');

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImpvcmRhbiIsImlhdCI6MTUxOTYzNzYxNiwiZXhwIjoxNTE5NzI0MDE2fQ.oPxemXuTvJGEXMbziUfK9bsCKyATaq1wmXU7p5c8neU'
var secretKey = "secret";
var accessKey = "access";
var signature = crypto.createHmac("sha256", secretKey).update(accessKey).digest('hex');

http.get({
  port: 8000,
  path: '/products',
  headers: {
    Authorization: token,
    Signature: signature,
    key: accessKey
  }
}, function (correct){
  if(correct){
    correct.setEncoding('utf8');
    correct.on('data', function (chunk) {
        console.log('Results:\n', chunk);
    });
  }
}
);
