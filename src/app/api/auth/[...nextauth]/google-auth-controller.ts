import IGAuth from './google-auth-modal';

import connectDB from '@/lib/mongoose';

// Function to check if the email exists in the database
export async function checkEmail(email: string) {
  const authRecord = await IGAuth.findOne({ email });
  return authRecord;
}

// Function to add or update the email, name, and expires in the database
export async function addOrUpdateEmail(email: string, name: string, expires: string) {
  const authRecord = await IGAuth.findOneAndUpdate(
    { email },
    { name, expires },
    { new: true, upsert: true }, // upsert: true creates a new document if no match is found
  );
  return authRecord;
}

// Example usage
export async function manageIGAuth(email: string, name: string, expires: string) {
  try {
    await connectDB();
    await addOrUpdateEmail(email, name, expires);
  } catch (err: unknown) {
    console.log('err : ', err);
  }
}
