const path = require("path");
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv").config();
// const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ],
  })
);

// Make request using body x-www
app.use("/api/users", require("./routes/authRoute"));
app.use("/api/documents", require("./routes/ocrRoute"));
app.use("/api/document", require("./routes/documentRoute"));

app.get('/', (req, res) =>{
    console.log("hi")
})
app.listen(port, () => console.log(`Server started on port ${port}`));