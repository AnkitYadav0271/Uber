import mongoose, { Schema } from "mongoose";

let blackListTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 1000 * 60 * 60 * 60 * 24,
  },
});

export const blackListTokenModel = mongoose.model(
  "BlackListToken",
  blackListTokenSchema
);
