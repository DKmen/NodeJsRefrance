const taskModel = require("../models/taskModel");

class APIfeatures {
  constructor(quary, quaryObject, req) {
    this.quary = quary;
    this.quaryObject = quaryObject;
    this.req = req;
  }

  finding() {
    this.quary = this.quary.find(this.quaryObject);
    return this;
  }

  sorting() {
    if (this.req.query.sort) {
      const quaryString = this.req.query.sort.split(",").join(" ");
      this.quary = this.quary.sort(quaryString);
    }

    return this;
  }

  fieldsInclude() {
    if (this.req.query.fields) {
      const quaryString = this.req.query.fields.split(",").join(" ");
      this.quary = this.quary.select(quaryString);
    }

    return this;
  }

  pagination() {
    if (this.req.query.limit && this.req.query.page) {
      const { page, limit } = this.req.query;
      this.quary = this.quary.skip((page * 1 - 1) * limit * 1).limit(limit * 1);
    }

    return this;
  }
}

exports.getTask = async (req, res) => {
  try {
    const quaryObject = JSON.parse(
      JSON.stringify({ ...req.query }).replace(
        /\b(gte|gt|lte|lt)\b/,
        (match) => `$${match}`
      )
    );

    const exclusiField = ["page", "limit", "sort", "fields"];
    exclusiField.forEach((element) => delete quaryObject[element]);

    let quary = new APIfeatures(taskModel.find(), quaryObject, req)
      .finding()
      .sorting()
      .fieldsInclude()
      .pagination();

    const allTask = await quary.quary;
    console.log(allTask);

    if (!allTask.length) {
      throw new Error("page does not exist");
    }

    res.status(200).json({
      status: "success",
      data: allTask,
    });
  } catch (error) {
    res.status(400).json({
      status: "erroe",
      message: error,
    });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const allTask = await taskModel.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: allTask,
    });
  } catch (error) {
    res.status(400).json({
      status: "erroe",
      message: error,
    });
  }
};

exports.addTask = async (req, res) => {
  try {
    const newTask = await taskModel.create({
      ...req.body,
    });

    res.status(200).json({
      status: "success",
      data: newTask,
    });
  } catch (error) {
    res.status(300).json({
      status: "error",
      message: error,
    });
  }
};

exports.updateTaskById = async (req, res) => {
  try {
    const newTask = await taskModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      data: newTask,
    });
  } catch (error) {
    res.status(300).json({
      status: "error",
      message: error,
    });
  }
};

exports.deleteTaskById = async (req, res) => {
  try {
    const newTask = await taskModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data: newTask,
    });
  } catch (error) {
    res.status(300).json({
      status: "error",
      message: error,
    });
  }
};
