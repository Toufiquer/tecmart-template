import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(request: Request) {
  try {
    const { tokenType, token } = await request.json();
    console.log('4 token  ', token);
    if (tokenType === 'google') {
      try {
        console.log('-- -- verifyIdToken', token);
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        if (!payload) {
          return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        return NextResponse.json({
          valid: true,
          user: {
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
          },
        });
      } catch (error) {
        console.log('error :', error);
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    } else if (tokenType === 'email') {
      // Implement email token verification logic here
      return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
    }

    return NextResponse.json({ error: 'Invalid token type' }, { status: 400 });
  } catch (error) {
    console.log('error :', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
