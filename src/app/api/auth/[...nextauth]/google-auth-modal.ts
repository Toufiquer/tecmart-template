import mongoose from 'mongoose';
const { Schema } = mongoose;
// Define the schema with a date field for expiration
const IGAuthSchema = new Schema({
  expiresAt: { type: Date, required: true }, // Date field for TTL index
  email: { type: String, unique: true },
  name: String,
});
// Create a TTL index on the 'expiresAt' field with a 10-minute expiration
IGAuthSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 600 });
// Create the model
export default mongoose.models.IGAuth || mongoose.model('IGAuth', IGAuthSchema);
