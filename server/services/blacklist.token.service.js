import { blackListTokenModel } from "../model/blacklist.tokens.model.js";
import { AppError } from "../utils/central.error.handler.js";

export const blackListToken = async (token) => {
  try {
    let result = await blackListTokenModel.create({ token: token });
    return true;
  } catch (err) {
    throw AppError.from(err, 400, "TRYING_TO_LOGOUT_USER");
  }
};

export const checkBlackListToken = async (token) => {
  try {
    let result = await blackListTokenModel.findOne({ token });
    if (!result) return false;
    return result;
  } catch (err) {
    throw new AppError(err, 401, "TRYING_TO_CHECK_BLACK_LIST_TOKEN");
  }
};
