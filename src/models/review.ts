import mongoose, { Schema } from "mongoose";

const reviewSchema: Schema = new Schema({
  userId: { type: Object, required: true },
  rating: { type: Number, required: true },
  courtId: { type: Object, required: true },
  date: { type: Date, required: true },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
