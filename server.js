const dotenv = require("dotenv");
dotenv.config({
  path: `${__dirname}/config.env`,
});



const mongoose = require("mongoose");
const app = require("./app");



mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology:true
  })
  .then((connect) => console.log("Data Base is connected..."))
  .catch((error) => console.log("Some error in connect with data base"));


app.listen(process.env.PORT, () =>
  console.log(`server is working on ${process.env.PORT}`)
);
