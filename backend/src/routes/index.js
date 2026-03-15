import userRoutes from "./user.route.js";
import salesRoter from "./sales.route.js";
import authRouter from "./auth.route.js";

export default (app) => {
    app.use("/api/user", userRoutes);
    app.use("/api/sales", salesRoter);
    app.use("/api/auth", authRouter);
};