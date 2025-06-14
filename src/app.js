import express from 'express';
import tasksRouter from './tasks/tasksRouter.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Tasks router
app.use("/tasks", tasksRouter);

// Root route
app.get("/", async (req, res, next) => {
  try {
    res.send("Thanks for visiting progresso backend server");
  } catch (error) {
    next(error);
  }
});

// Error route
app.get("/error", (req, res, next) => {
  try {
    res.send("Unfortunately you are in the error zone");
  } catch (error) {
    next(error);
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Requested Route Not Found" });
});

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: "Something went wrong from global error handler",
    error: error.message || error,
  });
});

export default app;
