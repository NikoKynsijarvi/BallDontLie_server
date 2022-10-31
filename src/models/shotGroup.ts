import mongoose, {Schema} from 'mongoose';

  const shotgroupSchema: Schema = new Schema({
    username: { type: String, required: true },
    type: {type: String, required: true},
    shotsmade: {type: Number, required: true},
    shotsattempted: {type: Number, required: true},
    date: {type: String, required: true},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Shotgroup"
    }   
  });

const Shotgroup = mongoose.model('Shotgroup', shotgroupSchema);
module.exports = Shotgroup