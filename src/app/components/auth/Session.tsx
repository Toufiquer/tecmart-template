/*
|-----------------------------------------
| setting up Session for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

'use client';

import { useSession, signOut } from 'next-auth/react'; // Import signOut
import { useEffect } from 'react';

const SessionAuth = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('session : ', session);
    if (typeof window === 'undefined') {
      return;
    }

    if (status === 'authenticated' && session) {
      const tokenFromSessionStorage = sessionStorage.getItem(process.env.NEXTAUTH_SECRET || '_');
      if (tokenFromSessionStorage) {
        console.log('tokenFromSessionStorage: ', tokenFromSessionStorage); // Optional: reduce noise
        console.log('Token found in sessionStorage, doing nothing.'); // Optional: reduce noise
        return;
      }

      const { email, name } = session.user;
      const sessionExpires = session.expires;
      console.log('tokenFromSessionStorage', tokenFromSessionStorage);
      console.log('sessionExpires: ', sessionExpires);
      console.log('email: ', email);
      console.log('name: ', name);

      if (email && name && sessionExpires) {
        console.log('Fetching token from API...');
        fetch('/api/auth/verify', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, expires: sessionExpires }),
        })
          .then(res => res.json())
          .then(data => {
            // This part will only be reached if res.ok was true
            if (data.data && data.status === 201) {
              sessionStorage.setItem(process.env.NEXTAUTH_SECRET || '_', data.data);
              console.log('Token fetched and saved to sessionStorage:', data.data);
            } else {
              console.error('Failed to get token from API response:', data);
              // Potentially clear sessionStorage here too if the API response is bad but not an HTTP error
              // sessionStorage.removeItem(SESSION_STORAGE_TOKEN_KEY);
            }
          })
          .catch(error => {
            // This will catch the error thrown above (including the 502 case after logging/signout)
            // or network errors
            console.error('Error fetching or saving token:', error.message);
            // If the error was due to 502, signOut and sessionStorage clear already happened.
            // If it's another error, you might also want to clear sessionStorage as a precaution:
            // if (!error.message.includes("502 Bad Gateway")) { // Avoid double-clearing for 502
            //   sessionStorage.removeItem(SESSION_STORAGE_TOKEN_KEY);
            // }
            // No, if it's another error, we don't necessarily want to sign out.
            // The 502 sign out is specific.
            // However, we should ensure the token is not present if the fetch failed for other reasons.
            // Let's ensure it's cleared if the token wasn't successfully set.
            if (!sessionStorage.getItem(process.env.NEXTAUTH_SECRET || '_')) {
              console.log('Ensuring token is cleared from sessionStorage due to fetch/save error.');
              // sessionStorage.removeItem(process.env.NEXTAUTH_SECRET || '_');
            }
          });
      } else {
        console.warn('Missing email, name, or expires in session data. Cannot fetch token.');
      }
    } else if (status === 'loading') {
      console.log('Session loading...');
    } else {
      // User not authenticated, no session data, or session ended
      console.log('User not authenticated or session ended. Clearing token from sessionStorage.');
      // sessionStorage.removeItem(process.env.NEXTAUTH_SECRET || '_');
    }
  }, [status, session]); // Dependencies

  return <></>;
};

export default SessionAuth;

// --- How to use the token from sessionStorage in your API calls ---
// (Your example usage remains the same)
/*
async function fetchDataWithAuth() {
  const token = sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY);
  if (!token) {
    console.error("No auth token found in sessionStorage");
    // Handle missing token (e.g., redirect to login, show error)
    return;
  }

  try {
    const response = await fetch('/api/some-protected-route', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      if (response.status === 401) { // Example: specific handling for 401
        console.error("Auth token rejected (401). Clearing token and potentially signing out.");
        sessionStorage.removeItem(SESSION_STORAGE_TOKEN_KEY);
        // Optionally, trigger a sign-out or redirect to login
        // signOut({ callbackUrl: '/login' }); // Example
      }
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    console.log('Protected data:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch protected data:', error);
    // If the error message indicates an auth failure, you might clear the token
    // if (error.message.includes("401")) {
    //   sessionStorage.removeItem(SESSION_STORAGE_TOKEN_KEY);
    // }
  }
}
*/
