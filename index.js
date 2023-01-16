const cors = require('cors');
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const { typeError } = require("./middlewares/errors");
const { dbConnection } = require("./config/config");

app.use(express.json(), cors());

dbConnection();

app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));
app.use("/comments", require("./routes/comments"));

app.use(express.static("./uploads"));
app.use(typeError);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
