import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "../utils/central.error.handler.js";

const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      min: [3, "first Name must be more than 3 chars"],
    },
    lastName: {
      type: String,
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  role: {
    type: String,
    enum: ["captain"],
    default: "captain",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      min: [3, "vehicle color length should be more than 3"],
    },
    plate: {
      type: String,
      required: true,
      min: [8, "plate length should be more than 8"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "bike", "auto"],
      default: "bike",
    },
    vehicleCapacity: {
      type: Number,
      required: true,
      min: [2, "Vehicle capacity should be more than 2"],
    },
    location: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
  },
});

captainSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return token;
  } catch (err) {
    throw AppError.from(err, 401, "Problem in generating captain auth token");
  }
};

captainSchema.methods.comparePassword = async function (password) {
  try {
    console.log("password :)", password);
    return bcrypt.compare(password, this.password);
  } catch (err) {
    throw AppError.from(err, 401, "Problem in comparing password");
  }
};

captainSchema.statics.hashPassword = async function (password) {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    throw AppError.from(err, 401, "Problem in hashing password");
  }
};
const captainModel = mongoose.model("captain", captainSchema);

export default captainModel;
