import mongoose, { Schema, Document } from 'mongoose';

import { __custom_selector_arr__, __default_selector__ } from '@/app/__1001_rtk_template__/store/StoreConstants';

const __4_template__Schema = new Schema(
  {
    name: { type: String, required: true },
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

export default mongoose.models.__3_template__ || mongoose.model('__3_template__', __4_template__Schema);

export interface I__3_template__ extends Document, Pick<mongoose.SchemaDefinition, 'name' | 'email' | 'passCode' | 'alias' | 'role'> {
  createdAt?: Date;
  updatedAt?: Date;
  img?: string;
}
