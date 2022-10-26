import mongoose, {Schema} from 'mongoose';


  const userSchema: Schema = new Schema({
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
   
  });

const User = mongoose.model('User', userSchema);
module.exports = User