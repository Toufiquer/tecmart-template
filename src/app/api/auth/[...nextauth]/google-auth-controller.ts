import Users, { IUsers } from './google-auth-modal';

import connectDB from '@/lib/mongoose';

// Example usage
export async function createOrUpdateUsers(data: IUsers) {
  const { name, email, accessToken1, fixedKey } = data;
  try {
    if (name && email && accessToken1 && fixedKey) {
      await connectDB();
      const authRecord = await Users.findOneAndUpdate(
        { email },
        { name, accessToken1, fixedKey },
        { new: true, upsert: true }, // upsert: true creates a new document if no match is found
      );
      console.log('');
      console.log('');
      console.log('authRecord : ', authRecord);
      console.log('');
      return authRecord;
    } else {
      console.log('missing some part of you data');
    }
  } catch (err: unknown) {
    console.log('err : ', err);
  }
}
