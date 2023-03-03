const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      lowercase: true,
      trim: true,
    },
    image_url: {
      type: String,
      trim: true,
    },
    address: {
      type: Object,
    },
    coordinates: {
      type: Object,
    },
    phone: {
      type: String,
      trim: true,
    },
    price: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      trim: true,
    },
    review_count: {
      type: Number,
      trim: true,
    },
    userPhotos: [],
    userRating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
