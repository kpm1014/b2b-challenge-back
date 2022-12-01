const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

async function createExpressApp(routers) {
    let app = express();
  
    //app.use(express.static("public"));
  
    app.use(cors());
  
    app.use(express.json());
  
    app.get("/", (req, res) => {
      res.sendFile("index.html", { root: path.join(__dirname, "public") });
    });
  
    for (let router of routers) {
      app.use(router);
    }
  
    const port = process.env.PORT || 8080;
  
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  
    return app;
  }
  
  module.exports = createExpressApp;
  