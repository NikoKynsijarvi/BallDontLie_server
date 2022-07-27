import { model, Schema} from 'mongoose';
import { User } from "../types"


  const userSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: Number, required: true }
  });

const UserModel = model<User>('User', userSchema);
module.exports = UserModel;