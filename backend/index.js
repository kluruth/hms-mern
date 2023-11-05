const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb+srv://hmsproject:sai123@cluster0.rcdhsq7.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to DB");
});

//user schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

//routes routes
app.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      if (password === user.password) {
        res.send({ message: "login success"});
      } else {
        res.send({ message: "wrong credentials" });
      }
    } else {
      res.send("not registered");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/Register", async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.send({ message: "user already exists" });
      console.log("user already exists");
    } else {
      const newUser = new User({firstName, lastName, email, password });
      await newUser.save();
      console.log(newUser);
      res.send({ message: "successful" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.get("/display",async(req,res)=>{
  StudentModel.find({},(err,result)=>{
      if(err){
          res.send(err);
      }
      res.json(result);
  });
});

app.listen(6969, () => {
  console.log("started");
});