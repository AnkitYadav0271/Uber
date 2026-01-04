import { AppError } from "../utils/central.error.handler.js";
import captainModel from "../model/captain.model.js";

//* registerCaptain Services Starts here

export const registerCaptainService = async ({
  email,
  firstName,
  lastName,
  socketId,
  role,
  vehicleType,
  plate,
  color,
  vehicleCapacity,
}) => {
  if (!email || !firstName || !lastName || !socketId || !role || !vehicleType|| !vehicleCapacity || !color) {
    throw AppError.from("SOME_FIELD_MISSING", 404, "REGISTER_USER");
  }

  try {
    let user =await captainModel.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      socketId,
      vehicle: {
        color,
        plate,
        vehicleCapacity,
        vehicleType,
      },
      role,
    });

    return user;
  } catch (error) {
    throw AppError.from(err, 400, {
      step: "registerCaptain",
      detail: { email, firstName },
    });
  }
};
