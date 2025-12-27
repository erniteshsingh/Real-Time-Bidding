const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    currentBid: {
      type: Number,
      default: 0,
    },

    minimumBidIncrement: {
      type: Number,
      default: 1000,
    },

    category: {
      type: String,
      required: true,
      enum: ["Sedan", "SUV", "Sports", "Supercar", "Electric", "Off-road"],
    },

    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
    },

    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
    },

    mileage: {
      type: String,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    isAuction: {
      type: Boolean,
      default: true,
    },

    auctionStartTime: {
      type: Date,
    },

    auctionEndTime: {
      type: Date,
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
