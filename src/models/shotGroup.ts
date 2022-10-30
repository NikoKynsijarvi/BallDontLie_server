import mongoose, {Schema} from 'mongoose';
import { ShotType } from '../types';

  const shotgroupSchema: Schema = new Schema({
    username: { type: String, required: true },
    type: {type: ShotType, required: true},
    shotsmade: {type: Number, required: true},
    shotsattempted: {type: Number, required: true},
    date: {type: String, required: true}   
  });

const Shotgroup = mongoose.model('Shotgroup', shotgroupSchema);
module.exports = Shotgroup