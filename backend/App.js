const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser(process.env.COOKIE_SECRET));

// Middlewares
app.use(express.json());
app.use(
    cors({
        origin: ["https://mern-job-portal-seven.vercel.app","http://localhost:5173"],
        methods: ["GET,POST,DELETE,PUT,PATCH"],
        credentials: true,
    })
);

// Custom Middlewares
const {
    authenticateUser,
} = require("./Middleware/UserAuthenticationMiddleware");

// Routers
const JobRouter = require("./Router/JobRouter");
const UserRouter = require("./Router/UserRouter");
const AuthRouter = require("./Router/AuthRouter");
const AdminRouter = require("./Router/AdminRouter");
const ApplicationRouter = require("./Router/ApplicationRouter");

// Connecting routes
// Make public job listing available without authentication. Protected job actions
// are enforced inside the router itself.
// Use lowercase '/jobs' to keep routes consistent across client and server.
app.use("/api/v1/jobs", JobRouter);
app.use("/api/v1/users", authenticateUser, UserRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/admin", authenticateUser, AdminRouter);
app.use("/api/v1/application", authenticateUser, ApplicationRouter);

module.exports = app;
