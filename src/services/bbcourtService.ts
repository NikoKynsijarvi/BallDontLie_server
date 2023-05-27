const BasketBallCourt = require("./../models/basketballCourt");

const getCourts = async () => {
  const courts = await BasketBallCourt.find({});
  return courts;
};

const rateCourt = async (courtId: string, rating: number) => {
  const court = await BasketBallCourt.find({ _id: courtId });
  const ratingSum = court.rating + rating;
  const newTimes_rated = court.times_rated + 1;
  const ratedCourt = {
    ...court,
    ratingSum: ratingSum,
    rating: ratingSum / newTimes_rated,
    times_rated: newTimes_rated,
  };
  console.log(ratedCourt);

  return court;
};

export default {
  getCourts,
  rateCourt,
};
