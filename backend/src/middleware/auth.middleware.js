import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
  
      if (!token) {
        return res.status(401).json({ message: "Unauthorized - No Token Provided" });
      }

      // get the user id from the decoded token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      if (!decoded) {
        return res.status(401).json({ message: "Unauthorized - Invalid Token" });
      } 

      // get the user from the database using userId
      const user = await User.findById(decoded.userId).select("-password");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      req.user = user;
      
      // call the next following function, this user is authenticated
      next();
    } catch (error) {
      console.log("Error in protectRoute middleware: ", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  } 