import express from "express";
import bbcourtService from "./../services/bbcourtService";

const User = require("./../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

const getTokenFrom = (request: any) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  } else {
    return null;
  }
};

router.get("/", async (_req, res) => {
  try {
    const courts = await bbcourtService.getCourts();
    res.send(courts);
  } catch (error) {
    console.log(error);
  }
});

router.put("/review/:id", async (req, res) => {
  try {
    const courtId = req.params.id;

    const rating = req.body.rating;
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);
    if (!user) {
      res.status(400);
    }
    const rated = await bbcourtService.rateCourt(courtId, rating);
    res.send(rated);
    console.log(user);
  } catch (error) {}
});

export default router;
