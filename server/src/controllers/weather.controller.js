import * as weatherService from "../services/weather/weather.service.js";

import AsyncHandler from "../utils/AsyncHandler.js";
import sendResponse from "../utils/sendResponse.js";

export const getWeather = AsyncHandler(async (req, res) => {
  const weather = await weatherService.updateWeather(req.params.id);

  return sendResponse(
    res,

    200,

    weather,
  );
});
