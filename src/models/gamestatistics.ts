import mongoose, {Schema} from 'mongoose';

const gamestatisticsSchema: Schema = new Schema({
    points: { type: Number, required: true },
    rebounds: {type: Number, required: true},
    assists: {type: Number, required: true},
    steals: {type: Number, required: true},
    blocks: {type: Number, required: true},
    fgpercentage:  {type: Number, required: true},
    user: {type: String, required: true}
  });

const Gamestatistics = mongoose.model('Gamestatistics', gamestatisticsSchema);
module.exports = Gamestatistics