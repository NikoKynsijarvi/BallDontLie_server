import mongoose, { Schema } from "mongoose";

const reviewSchema: Schema = new Schema({
  username: { type: String, required: true },
  rating: { type: Number, required: true },
  courtId: { type: Number, required: true },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
