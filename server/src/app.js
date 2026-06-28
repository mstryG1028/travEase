import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/index.js";
import authRouter from "./routes/auth.routes.js";
import listingRouter from "./routes/listing.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import reviewRouter from "./routes/review.routes.js";
import flashbackRouter from "./routes/flashback.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import chatRouter from "./routes/chat.routes.js";
import aiRouter from "./routes/ai.routes.js";
import pricingRouter from "./routes/pricing.routes.js";
import weatherRouter from "./routes/weather.routes.js";
import achievementRouter from "./routes/achievement.routes.js";
import availabilityRouter from "./routes/availability.routes.js";
import emergencyRouter from "./routes/emergency.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(
  express.json({
    limit: "20kb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  }),
);

app.use(cookieParser());

app.use("/api/v1/ai", aiRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/listings", listingRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/flashbacks", flashbackRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/pricing", pricingRouter);
app.use("/api/v1/weather", weatherRouter);
app.use("/api/v1/emergency", emergencyRouter);
app.use("/api/v1/achievements", achievementRouter);
app.use("/api/v1/calendar", availabilityRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.use(errorHandler); // it must be last middleware

export default app;
