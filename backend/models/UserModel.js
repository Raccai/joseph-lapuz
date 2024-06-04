const mongoose = require("mongoose"); 
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
})

// static signup method
userSchema.statics.signup = async function (username, password) {
  // validation
  if (!username || !password) {
    throw Error("Please fill all fields (username & password).");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Not a strong enough password.");
  }

  const exists = await this.findOne({ username })

  if (exists) {
    throw Error("Username already exists/in use.")
  }

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create user with hashed password
  const user = await this.create({ username, password: hash });

  return user;
}

// static login method
userSchema.statics.login = async function (username, password) {
  // validation
  if (!username || !password) {
    throw Error("Please fill all fields (username & password).");
  }

  const user = await this.findOne({ username })

  if (!user) {
    throw Error("User does not exist.")
  }

  // checks if password matches with user hashed password
  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error("Incorrect password.")
  }

  return user;
}

module.exports = mongoose.model("User", userSchema);