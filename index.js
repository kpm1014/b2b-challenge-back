const createExpressApp = require("./src/infra/http/express");




let routers = [
  
];


const app = createExpressApp(routers);

module.exports = app;