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
// import cookies from 'js-cookie'; // No longer using cookies for this

const SESSION_STORAGE_TOKEN_KEY = 'authToken';

const SessionAuth = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (status === 'authenticated' && session) {
      const tokenFromSessionStorage = sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY);

      if (tokenFromSessionStorage) {
        console.log('tokenFromSessionStorage: ', tokenFromSessionStorage);
        console.log('Token found in sessionStorage, doing nothing.');
        return;
      }

      // No token in sessionStorage, fetch it
      const { email, name } = session.user; // Assuming these are under session.user
      const sessionExpires = session.expires; // Top-level one from next-auth session

      if (email && name && sessionExpires) {
        console.log('Fetching token from API...');
        fetch('/api/auth/verify', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, expires: sessionExpires }),
        })
          .then(res => {
            if (!res.ok) {
              throw new Error(`API error: ${res.status}`);
            }
            return res.json();
          })
          .then(data => {
            if (data.data && data.status === 201) {
              // Assuming 'data.data' field holds the token
              sessionStorage.setItem(SESSION_STORAGE_TOKEN_KEY, data.data);
              console.log('Token fetched and saved to sessionStorage:', data.data);
            } else {
              console.error('Failed to get token from API response:', data);
            }
          })
          .catch(error => {
            console.error('Error fetching or saving token:', error);
          });
      } else {
        console.warn('Missing email, name, or expires in session data. Cannot fetch token.');
      }
    } else if (status === 'loading') {
      console.log('Session loading...');
    } else {
      // User not authenticated, no session data, or session ended
      console.log('User not authenticated or session ended. Clearing token from sessionStorage.');
      sessionStorage.removeItem(SESSION_STORAGE_TOKEN_KEY);
    }
  }, [status, session]); // Dependencies

  return <></>; // This component doesn't render UI, it's for side effects
};

export default SessionAuth;

// --- How to use the token from sessionStorage in your API calls ---
// You'll need to retrieve it and add it to your headers manually.
// Example:
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
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    console.log('Protected data:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch protected data:', error);
  }
}
*/
