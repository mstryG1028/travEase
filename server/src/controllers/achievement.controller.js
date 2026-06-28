import * as achievementService from "../services/achievement/achievement.service.js";

import AsyncHandler from "../utils/AsyncHandler.js";

import sendResponse from "../utils/sendResponse.js";

export const myAchievements = AsyncHandler(async (req, res) => {
  const data = await achievementService.myAchievements(req.user._id);

  return sendResponse(
    res,

    200,

    data,
  );
});
