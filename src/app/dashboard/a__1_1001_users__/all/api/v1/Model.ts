import mongoose, { Schema, Document } from 'mongoose';
import { __custom_selector_arr__, __default_selector__ } from '../../store/StoreConstants';

const user__1_104__Schema = new Schema(
  {
    name: { type: String, required: true },
    dataArr: [{ type: String, required: true }],
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    passCode: { type: String, required: true },
    alias: { type: String, required: true },
    role: {
      type: String,
      enum: __custom_selector_arr__,
      default: __default_selector__,
    },
  },
  { timestamps: true },
);

export default mongoose.models.User__1_103__ || mongoose.model('User__1_103__', user__1_104__Schema);

export interface IUsers__1_101__ extends Document, Pick<mongoose.SchemaDefinition, 'name' | 'email' | 'passCode' | 'alias' | 'role' | 'dataArr'> {
  createdAt?: Date;
  updatedAt?: Date;
  img?: string;
}
