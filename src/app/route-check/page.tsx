/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

import AuthCheckingComponent from '../components/auth/AuthChecking';

const Page = () => {
  return (
    <main>
      <AuthCheckingComponent redirectUrl="/route-check">Page</AuthCheckingComponent>
    </main>
  );
};
export default Page;
