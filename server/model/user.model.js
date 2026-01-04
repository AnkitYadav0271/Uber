import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/central.error.handler.js";

const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "first name should be more than 3 chars"],
    },
    lastName: {
      type: String,
    },
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    minlength: [5, "email length should be more than 5 chars"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn:"24h"});
    return token;
  } catch (err) {
    throw AppError.from(
      err,
      401,
      "TRYING_TO_CREATE_JWT"
    );
  }
};

userSchema.methods.comparePassword = async function (password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (err) {
    throw AppError.from(
      err,
      401,
      "TRYING_TO_COMPARE_PASSWORD"
    );
  }
};

userSchema.statics.hashPassword = async function(password) {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    throw AppError.from(
      err,
      401,
      "TRYING_TO_HASH_PASSWORD"
    );
  }
};


const userModel = mongoose.model("User", userSchema);

export default userModel;
