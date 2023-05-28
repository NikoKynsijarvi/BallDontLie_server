const BasketBallCourt = require("./../models/basketballCourt");
const Review = require("./../models/review");
import mongoose from "mongoose";

const getCourts = async () => {
  const courts = await BasketBallCourt.find({});
  return courts;
};

const rateCourt = async (courtId: string, rating: number, userId: string) => {
  const court = await BasketBallCourt.findOne({ _id: courtId });
  const ratingSum = parseInt(court.rating_sum) + rating;
  const newTimes_rated = court.times_rated + 1;

  const updateCourt = await BasketBallCourt.findOneAndUpdate(
    { _id: courtId },
    {
      rating: ratingSum / newTimes_rated,
      rating_sum: ratingSum,
      times_rated: court.times_rated + 1,
    },
    { new: true }
  );

  const review = new Review({
    courtId: new mongoose.Types.ObjectId(courtId),
    rating: rating,
    userId: userId,
  });

  const newReview = await review.save();
  if (!newReview) {
    return false;
  }
  console.log(newReview);

  return updateCourt;
};

export default {
  getCourts,
  rateCourt,
};
