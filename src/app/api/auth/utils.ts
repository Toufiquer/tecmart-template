import Users from '@/app/api/auth/[...nextauth]/google-auth-modal';

// Function to check if the email exists in the database
export async function checkEmail(email: string) {
  const authRecord = await Users.findOne({ email });
  return authRecord;
}
