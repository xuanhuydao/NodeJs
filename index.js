const express = require('express');
require('dotenv').config();

const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");

const database = require("./config/database");
database.connect();

const systemConfig = require("./config/system");

const app = express();
const port = process.env.PORT;

app.set("views","./views");
app.set("view engine", "pug");


//App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.use(express.static("public"));

routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
