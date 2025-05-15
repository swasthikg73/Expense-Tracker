const express = require("express");
var cors = require("cors");
const { createServer } = require("node:http");
const userRouter = require("./routes/userRoutes");
const budgetRouter = require("./routes/budgetRoute");
const { error } = require("node:console");

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);

app.get("", (req, res) => {
  res.send({
  activeStatus :true,
  error:false
});

app.get("/", (req,res)=> {
res.send({
  activeStatus :true,
  error:false
});
})

app.use("/user", userRouter);
app.use("/budget", budgetRouter);

server.listen(PORT, () => {
  try {
    console.log("App is running on port :", `http://localhost:${PORT}`);
  } catch (err) {
    console.log("Error occured: ", err);
  }
});
