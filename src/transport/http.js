// const axios = require('axios');

// const http = axios.create();
// delete http.defaults.headers.post['Content-Type'];
// delete http.defaults.headers.common['Accept'];

const http = {
  post(url, data, opts) {
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest();
      Object.keys(opts).forEach(key => (request[key] = opts[key]));
      request.addEventListener('load', function() {
        resolve({ data: this.response });
      });
      request.addEventListener('error', e => {
        reject(e);
      });
      request.open('POST', url);
      request.setRequestHeader('Content-Type', '');
      request.setRequestHeader('Accept', '*/*');
      request.onreadystatechange = function() {
        if (request.readyState === 4) {
          if (request.status !== 200) {
            //reject(new Error(`API request error ${request.status}`));
            reject(`API request error ${request.status}`);
          }
        }
      };
      request.send(data);
    });
  },
};

module.exports = http;
