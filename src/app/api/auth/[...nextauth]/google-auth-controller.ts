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

// Function to delete the data after 10 minutes
export async function deleteAfterTenMinutes(email: string) {
  setTimeout(
    async () => {
      await IGAuth.deleteOne({ email });
      console.log(`Deleted record with email: ${email}`);
    },
    10 * 60 * 1000,
  ); // 10 minutes in milliseconds
}

// Example usage
export async function manageIGAuth(email: string, name: string, expires: string) {
  try {
    await connectDB();
    const updatedRecord = await addOrUpdateEmail(email, name, expires);
    console.log('Record added/updated:', updatedRecord);

    // Schedule deletion after 10 minutes
    deleteAfterTenMinutes(email);
  } catch (err: unknown) {
    console.log('err : ', err);
  }
}
