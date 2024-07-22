const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routerGetBank = require('./routes/getbank')
const app = express();
app.use(cors());
app.use(express.json());
async function connect() {
  try {
    await mongoose.connect('mongodb+srv://dieucew:dgkvnPjFoDVL0z6Z@dieulink.iyxukns.mongodb.net/', { useNewUrlParser: true });
    console.log("Mongoose connect succsess");
  } catch (error) {
    console.log(error);
  }
}
connect();
app.use("/api", routerGetBank);
const PORT = process.env.PORT || 9987;
app.listen(PORT, () => {
  console.log("NodeJs is running PORT ", PORT);
});