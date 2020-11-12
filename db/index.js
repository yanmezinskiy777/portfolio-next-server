const mongoose = require("mongoose");
const config = require("../config/dev");

require("./models/portfolio");
require("./models/user");

exports.connect = () => {
  return mongoose.connect(
    config.DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("MongoDB connected!");
      }
    }
  );
};
