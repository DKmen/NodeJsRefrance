const express = require("express");
const tourColtroller = require("../controllers/tourController");

const taskRoute = express.Router();

taskRoute.route("/").get(tourColtroller.getTask);
taskRoute
  .route("/:id")
  .get(tourColtroller.getTaskById)
  .patch(tourColtroller.updateTaskById)
  .delete(tourColtroller.deleteTaskById);
taskRoute.route("/").post(tourColtroller.addTask);

module.exports = taskRoute;
