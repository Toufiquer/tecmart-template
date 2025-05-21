import mongoose from 'mongoose';
const { Schema } = mongoose;
const UsersSchema = new Schema({
  accessToken1: { type: String, required: true },
  fixedKey: { type: String, required: true },
  email: { type: String, unique: true },
  name: { type: String, required: true },
});
export default mongoose.models.Users || mongoose.model('Users', UsersSchema);

export interface IUsers {
  name: string;
  email: string;
  accessToken1: string;
  fixedKey: string;
}
