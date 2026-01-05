import { AppError } from "../utils/central.error.handler.js";
import captainModel from "../model/captain.model.js";
import { blackListToken } from "./blacklist.token.service.js";

//* registerCaptain Services Starts here

export const registerCaptainService = async ({
  email,
  firstName,
  lastName,
  role,
  vehicleType,
  plate,
  color,
  vehicleCapacity,
  password,
}) => {
  console.log("Logging password", password);
  if (
    !email ||
    !firstName ||
    !lastName ||
    !role ||
    !vehicleType ||
    !vehicleCapacity ||
    !color ||
    !password
  ) {
    throw AppError.from("SOME_FIELD_MISSING", 404, "REGISTER_USER");
  }

  try {
    let user = await captainModel.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      vehicle: {
        color,
        plate,
        vehicleCapacity,
        vehicleType,
      },
      role,
      password,
    });

    return user;
  } catch (error) {
    throw AppError.from(error, 400, {
      step: "registerCaptain",
      detail: { email, firstName },
    });
  }
};

//* register captain service ends here

export const isCaptainExists = async (email) => {
  try {
    let captain = await captainModel.findOne({ email });
    return captain;
  } catch (err) {
    throw AppError.from(err, 401, "trying to check is captain exists");
  }
};

//*captain Login starts here

export const loginCaptainService = async ({ email, password }) => {
  try {
    const captain = await captainModel.findOne({ email }).select("+password");
   
    if (!captain) {
      throw new Error("Invalid Email or Password");
    }

    const matchPassword = await captain.comparePassword(password);
    console.log("logging Match Password", matchPassword);
    if (!matchPassword) {
      throw new Error("Invalid email or password");
    }

    captain.password = null;
    return captain;
  } catch (err) {
    throw AppError.from(err, 401, {
      message: "Trying to login at captain service",
      email,
    });
  }
};

//*captain  login service ends here

//*Captain Logout service starts here 
export const logoutCaptainService = async(token) => {
  try {
    let result = await blackListToken(token);
    return result;
  } catch (error) {
    throw AppError.from(error,401,{message:"trying to logout user with blacklisting token"})
  }
}
//* Captain Logout service ends here

