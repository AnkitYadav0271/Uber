import captainModel from "../model/captain.model.js";
import {
  isCaptainExists,
  loginCaptainService,
  logoutCaptainService,
  registerCaptainService,
} from "../services/captain.services.js";
import { AppError } from "../utils/central.error.handler.js";

//* captain Register controller starts here
export const registerCaptainController = async (req, res, next) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
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
    const CheckCaptainExists = await isCaptainExists(email);

    if (CheckCaptainExists) {
      return res.status(401).json({ message: "captain already exists" });
    }

    let hashedPassword = await captainModel.hashPassword(password);
    console.log("hashedPassword", hashedPassword);

    const user = await registerCaptainService({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      vehicleCapacity,
      vehicleType,
      color,
      plate,
    });
    const token = await user.generateAuthToken();
    console.log("token:)", token);
    return res.status(200).json({ user, token });
  } catch (error) {
    throw AppError.from(error, 500, "At registerCaptain controller");
  }
};

//* Register captain controller ends here

//*Login captain controller starts here

export const loginCaptainController = async (req, res, next) => {
  const captain = await loginCaptainService(req.body);
  let token = await captain.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ success: true, captain, token });
};

//*Login captain controller ends here

//* Captain Logout controller starts here 

export const logOutCaptainController = async (req,res,next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if(!token) {
      return res.status(404).json({success:false,message:"unAuthorized"});
    }
    await logoutCaptainService(token);
    res.clearCookie("token");
    return res.json(200).json({success:true});
  } catch (error) {
    throw AppError.from(error,401,{message:"trying to logout user at controller"});
  }
}

//* Captain Logout controller ends here 
