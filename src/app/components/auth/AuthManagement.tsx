/*
|-----------------------------------------
| setting up AuthManagement for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

import GoogleAuthButton from '@/app/login/components/GoogleAuthButton';

import ClientComponent from './ClientComponent';
import ServerComponent from './ServerComponent';

const AuthManagement = () => {
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex gap-4 min-h-screen items-center justify-center p-4">
        <ClientComponent />
        <ServerComponent />
      </div>
      <GoogleAuthButton />
    </main>
  );
};
export default AuthManagement;
