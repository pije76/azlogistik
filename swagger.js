const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/v1/index.js'];; // root file dimana router dijalankan.
const doc = {
    info: {
        title: 'Dokumentasi',
        description: 'Ini adalah Endpoint dari BackEnd',
    },
    host: 'localhost:5000',
    basePath: "/v1",
    schemes: ['http'],
    
};
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js'); // Your project's root file
})