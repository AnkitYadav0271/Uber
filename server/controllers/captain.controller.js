import captainModel from "../model/captain.model.js";
import { registerCaptainService } from "../services/captain.services.js";
import { AppError } from "../utils/central.error.handler.js";

export const registerCaptain = async (req, res, next) => {
  const {
    email,
    firstName,
    lastName,
    color,
    vehicleType,
    vehicleCapacity,
    role,
    plate,
    password,
  } = req.body;
  if (
    !email ||
    !firstName ||
    !lastName ||
    !color ||
    !vehicleCapacity ||
    !vehicleType ||
    !role ||
    !plate ||
    !password
  ) {
    throw AppError.from(
      "Some filed Missing",
      404,
      "Trying to register captain at controller"
    );
  }

  try {
    const user = await registerCaptainService(req.body);
    const token = await user.generateAuthToken();
    return res.json({ user, token });
  } catch (error) {
    throw AppError.from(error, 500, "At registerCaptain controller");
  }
};
