const User = require('../models/User')
// const Payments = require('../models/paymentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require("crypto")
const ErrorResponse = require("../util/errorResponse")
const sendEmail = require("../util/sendEmail")

const UserController = {
    register:  async (req, res, next) => {
        const { name, email, password } = req.body;
      
        try {
          const user = await User.create({
            name,
            email,
            password,
          });
      
          sendToken(user, 200, res);
        } catch (err) {
          next(err);
        }
    },
    login:  async (req, res, next) => {
        const { email, password } = req.body;
      
        // Check if email and password is provided
        if (!email || !password) {
          return next(new ErrorResponse("Please provide an email and password", 400));
        }
      
        try {
          // Check that user exists by email
          const user = await User.findOne({ email }).select("+password");
      
          if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
          }
      
          // Check that password match
          const isMatch = await user.matchPassword(password);
      
          if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
          }
      
          sendToken(user, 200, res);
        } catch (err) {
          next(err);
        }
    },
    logout: async (req, res) =>{

        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    forgotPassword: async (req, res, next) => {
        // Send Email to email provided but first check if user exists
        const { email } = req.body;
      
        try {
          const user = await User.findOne({ email });
      
          if (!user) {
            return next(new ErrorResponse("No email could not be sent", 404));
          }
      
          // Reset Token Gen and add to database hashed (private) version of token
          const resetToken = user.getResetPasswordToken();
      
          await user.save();
      
          // Create reset url to email to provided email
          const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
      
          // HTML Message
          const message = `
            <h1>You have requested a password reset</h1>
            <p>Please make a put request to the following link:</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
          `;
      
          try {
            await sendEmail({
              to: user.email,
              subject: "Password Reset Request",
              text: message,
            });
      
            res.status(200).json({ success: true, data: "Email Sent" });
          } catch (err) {
            console.log(err);
      
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
      
            await user.save();
      
            return next(new ErrorResponse("Email could not be sent", 500));
          }
        } catch (err) {
          next(err);
        }
      },
      resetPassword : async (req, res, next) => {
        // Compare token in URL params to hashed token
        const resetPasswordToken = crypto
          .createHash("sha256")
          .update(req.params.resetToken)
          .digest("hex");
      
        try {
          const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
          });
      
          if (!user) {
            return next(new ErrorResponse("Invalid Token", 400));
          }
      
          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
      
          await user.save();
      
          res.status(201).json({
            success: true,
            data: "Password Updated Success",
            token: user.getSignedJwtToken(),
          });
        } catch (err) {
          next(err);
        }
      },
    refreshToken: (req, res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: user.id})

                res.json({accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
        
    },
    getUser: async (req, res) =>{
        try {
            const user = await User.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg: "User does not exist."})

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    addAssignment: async (req, res) =>{
        try {
            const user = await User.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            await User.findOneAndUpdate({_id: req.user.id}, {
                assignments: req.body.assignments
            })

            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    history: async(req, res) =>{
        try {
            const history = await Payments.find({user_id: req.user.id})

            res.json(history)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
 }

 const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
  };
  
// const createAccessToken = (user) =>{
//     return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
// }
// const createRefreshToken = (user) =>{
//     return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
// }

module.exports = UserController