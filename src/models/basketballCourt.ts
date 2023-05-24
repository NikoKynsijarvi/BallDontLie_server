import mongoose, { Schema } from "mongoose";

const basketballCourtSchema: Schema = new Schema(
  {
    id: { type: Number, required: true },
    contract_type: {
      id: { type: String },
      description: {
        fi: { type: String },
        sv: { type: String },
        en: { type: String },
      },
    },
    name: {
      fi: { type: String },
      sv: { type: String },
      en: { type: String },
    },
    street_address: {
      fi: { type: String },
      sv: { type: String },
      en: { type: String },
    },
    municipality: { type: String },
    location: {
      type: { type: String },
      coordinates: { type: Array },
    },
    geometry: {
      type: { type: String },
      coordinates: { type: Array },
    },
    object_type: { type: String },
    rating: { type: Number },
  },
  { collection: "bbcourts" }
);

const Bbcourt = mongoose.model("BasketballCourt", basketballCourtSchema);
module.exports = Bbcourt;
