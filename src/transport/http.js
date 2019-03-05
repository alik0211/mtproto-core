import axios from 'axios';

export const http = axios.create();
delete http.defaults.headers.post['Content-Type'];
delete http.defaults.headers.common['Accept'];

export default http;
