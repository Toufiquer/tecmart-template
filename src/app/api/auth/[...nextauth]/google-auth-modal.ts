import mongoose from 'mongoose';

const { Schema } = mongoose;

const IGAuthSchema = new Schema({
  expires: String,
  email: { type: String, unique: true },
  name: String,
});

export default mongoose.models.IGAuth || mongoose.model('IGAuth', IGAuthSchema);
// export const IGAuth = model('IGAuth', IGAuthSchema);

// export default mongoose.models._3_template_ || mongoose.model('_3_template_', _4_template_Schema);
