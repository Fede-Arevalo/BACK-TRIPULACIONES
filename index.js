const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const { typeError } = require("./middlewares/errors");
const { dbConnection } = require("./config/config");
const cors = require('cors');

app.use(express.json(), cors());

dbConnection();

app.use("/users", require("./routes/users"));
app.use("/categories", require("./routes/categories"));
app.use("/events", require("./routes/events"));
app.use("/incidents", require("./routes/incidents"));


app.use(express.static("./uploads"));
app.use(typeError);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
