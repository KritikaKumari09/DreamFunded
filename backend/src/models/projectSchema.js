import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Completed"],
      default: "Open",
    },
    description: {
      type: String,
      required: true,
    },
    tags: [
      {type: String}
    ],
    deadline: {
      type: Date,
      required: true,
    },
    totalFundsRequired: {
      type: Number,
      required: true,
    },
    fundsCollected: {
      type: Number,
      default: 0,
    },
    fundingHistory: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

projectSchema.pre("save", function (next) {
  this.fundsRequired = this.TotalFundsRequired - this.fundsCollected;
  next();
});

projectSchema.methods.addFunds = function (user, amount) {
  this.fundsCollected += amount;
  this.fundingHistory.push({user, amount });
};
export const Project = mongoose.model("Project", projectSchema);
