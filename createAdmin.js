const mongoose = require("mongoose");
const { mongodbUrl } = require("./config");
const User = require("./models/User");

mongoose.connect(mongodbUrl).then(() => {
  const admin = new User({
    name: "admin",
    email: "admin@gmail.com",
    isAdmin: true
  });
  admin.password = admin.encryptPassword("admin");
  admin.save().then(() => {
    console.log("Admin successfully created");
    process.exit(0);
  });
});
