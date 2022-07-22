require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./router/auth");
const postRouter = require("./router/postRouter");
const cors = require("cors");
const connectDB = async () => {
  await mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-lerning.hmt6g.mongodb.net/mern-lerning?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch((err) => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });
};
connectDB();
const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
