import mongoose, { Schema } from 'mongoose';
import { __custom_selector_arr__, __default_selector__ } from '../../store/StoreConstants';

const user__1_104__Schema = new Schema(
  {
    name: { type: String, required: true },
    dataArr: [{ type: String, required: false }],
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
    images: [{ type: String }],
    descriptions: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.User__1_103__ || mongoose.model('User__1_103__', user__1_104__Schema);

export interface IUsers__1_101__ {
  name: string;
  dataArr?: string[];
  email: string;
  passCode: string;
  alias: string;
  role: string;
  images?: string[];
  descriptions?: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}
