const axios = require('axios');

const https = require('https');
const {api_base_path, api_key} = require('../config');

const get = (path) => axios({
    method: 'get',
    url: `${api_base_path}${path}&api_key=${api_key}`,
    headers: {}
}).then(response => response.data);

module.exports.get = get