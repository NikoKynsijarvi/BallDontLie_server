const BasketBallCourt = require("./../models/basketballCourt");

const getCourts = async () => {
  const courts = await BasketBallCourt.find({});
  return courts;
};

const rateCourt = async (courtId: string) => {
  const court = await BasketBallCourt.find({ _id: courtId });
  console.log(court);

  return court;
};

export default {
  getCourts,
  rateCourt,
};
