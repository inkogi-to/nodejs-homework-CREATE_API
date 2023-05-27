const mongoose = require("mongoose");

// const {DB_HOST} = process.env;

mongoose.set("strictQuery", true);

const app = require("./app");

mongoose.connect(process.env.DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
