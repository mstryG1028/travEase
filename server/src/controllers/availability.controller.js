import * as availabilityService from "../services/availability/availability.service.js";

import AsyncHandler from "../utils/AsyncHandler.js";

import sendResponse from "../utils/sendResponse.js";

export const calendar = AsyncHandler(async (req, res) => {
  const data = await availabilityService.calendar(req.params.id);

  return sendResponse(
    res,

    200,

    data,
  );
});

export const ownerBlock = AsyncHandler(async (req, res) => {
  await availabilityService.ownerBlock(
    req.params.id,

    req.body.date,
  );

  return sendResponse(
    res,

    200,

    null,

    "Blocked",
  );
});

export const ownerUnblock = AsyncHandler(async (req, res) => {
  await availabilityService.ownerUnblock(
    req.params.id,

    req.body.date,
  );

  return sendResponse(
    res,

    200,

    null,

    "Unblocked",
  );
});
