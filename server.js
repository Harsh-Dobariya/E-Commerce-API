const app = require("express")();

require("express-async-errors");
require("./config/mongoose")(app);
require("./config/passport");
require("./routes")(app);
