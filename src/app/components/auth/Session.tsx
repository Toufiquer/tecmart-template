/*
|-----------------------------------------
| setting up Session for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const SessionAuth = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (status === 'authenticated' && session) {
      const tokenFromSessionStorage = sessionStorage.getItem(process.env.NEXTAUTH_SECRET || '_');
      if (tokenFromSessionStorage) {
        return;
      }

      const { email, name } = session.user;
      const sessionExpires = session.expires;

      if (email && name && sessionExpires) {
        fetch('/api/auth/verify', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, expires: sessionExpires, authType: 'google' }),
        })
          .then(res => res.json())
          .then(data => {
            // This part will only be reached if res.ok was true
            if (data.data && data.status === 201) {
              sessionStorage.setItem(process.env.NEXTAUTH_SECRET || '_', data.data);
            } else {
              console.error('Failed to get token from API response:', data);
              // sessionStorage.removeItem(process.env.NEXTAUTH_SECRET || '_');
              // signOut();
            }
          })
          .catch(error => {
            console.error('Error fetching or saving token:', error.message);
          });
      } else {
        console.warn('Missing email, name, or expires in session data. Cannot fetch token.');
      }
    } else if (status === 'loading') {
    } else {
      // User not authenticated, no session data, or session ended
      console.log('Error: User not authenticated or session ended. Clearing token from sessionStorage.');
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
