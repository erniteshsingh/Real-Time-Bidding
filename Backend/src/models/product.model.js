const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
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
    time: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: String,
    brand: String,
    model: String,
    description: String,
    price: Number,

    currentBid: {
      type: Number,
      default: 0,
    },

    minimumBidIncrement: {
      type: Number,
      default: 1000,
    },

    highestBidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    bidHistory: [bidSchema],

    finalPrice: {
      type: Number,
    },

    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    category: {
      type: String,
      enum: [
        "Sedan",
        "SUV",
        "Sports",
        "Supercar",
        "Electric",
        "Off-road",
        "Hatchback",
      ],
    },

    images: [String],

    isAuction: {
      type: Boolean,
      default: true,
    },

    auctionStartTime: Date,
    auctionEndTime: Date,

    auctionEnded: {
      type: Boolean,
      default: false,
    },

    totalBids: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["draft", "live", "sold", "expired"],
      default: "draft",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
