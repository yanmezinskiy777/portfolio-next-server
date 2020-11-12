const mongoose = require("mongoose");
const config = require("../config/dev");
const Populate = require("./populate");

mongoose.connect(
  config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  async (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("> Starting");
      await Populate.populate();
      console.log("> Finish!");
    }
  }
);
