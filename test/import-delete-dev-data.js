const dotenv = require("dotenv");
dotenv.config({
    path: `./config.env`,
});


const mongoose = require("mongoose");
const fs = require("fs");
const taskModel = require("../models/taskModel.js");

mongoose
    .connect(process.env.DATABASE_LOCAL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    })
    .then((connect) => console.log("Data Base is connected..."))
    .catch((error) => console.log("Some error in connect with data base"));


const importData = async () => {
    const taskData = JSON.parse(fs.readFileSync(`${__dirname}/taskData.json`));
    await taskModel.create(taskData);
    console.log("data success fully save");
    process.exit();
}

const deleteData = async () => {
    await taskModel.deleteMany();
    console.log("data delete success fully");
    process.exit();
}

if (process.argv[2] == '--import') {
    importData();
} else if (process.argv[2] == '--delete') {
    deleteData();
} else {
    console.log('pass proper argument like for import data pass --import for delete all data pass --delete')
    process.exit();
}
