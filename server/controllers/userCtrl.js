const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const userModel = require("../models/userModel");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");

//register
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(200).send({
        message: "User already registered",
        success: false,
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "User saved", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error registering",
      success: false,
    });
  }
};

//login
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while login",
      success: false,
    });
  }
};

const authController = async (req, res) => {
  try {
  } catch (error) {}
};

//apply doc controller
const applyDoctorController = async (req, res) => {
  try {
  } catch (error) {}
};

// notification
const getAllNotificationController = async (req, res) => {
  try {
  } catch (error) {}
};

// delete notifications
const deleteAllNotificationController = async (req, res) => {
  try {
  } catch (error) {}
};

// get all doctors appointment
const getAllDocotrsController = async (req, res) => {
  try {
  } catch (error) {}
};

// Book appointment
const bookeAppointmnetController = async (req, res) => {
  try {
  } catch (error) {}
};

// check booking availability
const bookingAvailabilityController = async (req, res) => {
  try {
  } catch (error) {}
};

// user appointment
const userAppointmentsController = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocotrsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
};
