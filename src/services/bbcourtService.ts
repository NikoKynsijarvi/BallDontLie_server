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
  var last_ratings = court.newest_ratings;
  if (last_ratings.count > 3) {
    last_ratings.shift();
    last_ratings.push({ date: new Date(), rating: rating });
  } else {
    last_ratings.push({ date: new Date(), rating: rating });
  }
  const updateCourt = await BasketBallCourt.findOneAndUpdate(
    { _id: courtId },
    {
      rating: ratingSum / newTimes_rated,
      rating_sum: ratingSum,
      times_rated: court.times_rated + 1,
      newest_ratings: last_ratings,
    },
    { new: true }
  );

  const review = new Review({
    courtId: new mongoose.Types.ObjectId(courtId),
    rating: rating,
    userId: userId,
    date: new Date(),
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
