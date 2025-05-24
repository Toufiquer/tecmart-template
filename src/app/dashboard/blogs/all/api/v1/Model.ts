import mongoose, { Schema } from 'mongoose';
import { blogsSelectorArr, select } from '../../store/StoreConstants';

const blogSchema = new Schema(
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
      enum: blogsSelectorArr,
      default: select,
    },
    images: [{ type: String }],
    descriptions: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export interface IBlogs {
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
