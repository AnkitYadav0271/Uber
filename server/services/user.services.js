import userModel from "../model/user.model.js";
import { AppError } from "../utils/central.error.handler.js";

export const registerUserService = async ({
  email,
  firstName,
  password,
  lastName,
}) => {
  if (!email || !firstName || !password) {
    throw AppError.from("SOME_FIELD_MISSING", 404, "REGISTER_USER");
  }
  try {
    let user = await userModel.create({
      email: email,
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      password: password,
    });

    return user;
  } catch (err) {
    throw AppError.from(err, 400, {
      step: "registerUser",
      detail: { email, firstName },
    });
  }
};
