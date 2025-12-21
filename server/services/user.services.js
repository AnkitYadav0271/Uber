import userModel from "../model/user.model.js";
import { AppError } from "../utils/central.error.handler.js";

//*________________Register User Service starts here _______________//
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

//________________Register User Service ends here _______________//

//*_______________Login User Service starts here _______________//

export const loginUserService = async ({ email, password }) => {
  try {
    let user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      throw new Error( "Invalid Email or Password");
    }

    let matchPassword = await user.comparePassword(password);
    console.log("Logging Match Password :)",matchPassword);
    if (!matchPassword) {
      throw new Error("Invalid Email or Password");
    }

    user.password = undefined;
    return user;
  } catch (err) {
    throw AppError.from(err, 401, "TRYING_TO_LOGIN_USER", { email });
  }
};
