const BasketBallCourt = require("./../models/basketballCourt");

const getCourts = async () => {
  const courts = await BasketBallCourt.find({});
  return courts;
};

const rateCourt = async (courtId: string, rating: number) => {
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

  return updateCourt;
};

export default {
  getCourts,
  rateCourt,
};
