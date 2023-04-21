const axios = require('axios');

axios.get('localhost:5000/students').then(function (response) {
    // handle success
    console.log(response);
})