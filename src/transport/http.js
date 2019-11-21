const axios = require('axios');

const http = axios.create();
delete http.defaults.headers.post['Content-Type'];
delete http.defaults.headers.common['Accept'];

module.exports = http;
