import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarImage: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      required: true,
    },
    otpExpiry: {
      type: Date,
      default: new Date(Date.now() + 3600000),
    },
    forgetPasswordOtp: {
      type: String,
    },
    forgetPasswordOtpExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
    gitHubUsername: {
      type: String,
    },
    bankName: {
      type: String,
    },
    accountNumber: {
      type: Number,
    },
    IFSC: {
      type: String,
    },
    PAN: {
      type: String,
    },
    fundsCollectedProjects: [
      {
          project: {
              type: Schema.Types.ObjectId,
              ref: "Project",
          },
          collectedAt: {
              type: Date,
              default: Date.now,
          },
          amountCollected: {
              type: Number,
              required: true,
          },
      },
  ],

  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
