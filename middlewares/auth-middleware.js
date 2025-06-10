import jwt from "jsonwebtoken";
import User from "../models/user.js";

//Middleware to protect routes

const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; //Extract the token from the header
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //Verify the token
      req.user = await User.findById(decoded.id).select("-password"); //Find the user by ID and exclude the password field
      next(); //Call the next middleware
    } else {
      res.status(401).json({
        message: "Not authorized, no token provided",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Not authorized, token failed",
      error: error.message,
    });
  }
};

export default protect;
