import * as pricingService from "../services/pricing/pricing.service.js";

import AsyncHandler from "../utils/AsyncHandler.js";

import sendResponse from "../utils/sendResponse.js";

export const calculatePrice = AsyncHandler(async (req, res) => {
  const data = await pricingService.calculatePrice(
    req.params.id,

    req.query.date,
  );

  return sendResponse(
    res,

    200,

    data,
  );
});

export const updatePricing = AsyncHandler(async (req, res) => {
  const pricing = await pricingService.updatePricing(
    req.params.id,

    req.body,
  );

  return sendResponse(
    res,

    200,

    pricing,

    "Pricing Updated",
  );
});
