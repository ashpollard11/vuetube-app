const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const Category = require("./models/Category");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/categories.json`, "utf-8")
);

const importData = async () => {
  try {
    await Category.create(categories);

    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err.error);
  }
};

const deleteData = async () => {
  try {
    await Category.deleteMany();

    console.log("Data Deleted...".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err.error);
  }
};

switch (process.argv[2]) {
  case "-id": // node seeder -id
    importData();
    break;
  case "-dd": //node seeder -dd
    deleteData();
    break;
  default:
    console.log("\n-id\t Import Data");
    console.log("-dd\t Delete Data");
    process.exit();
}
