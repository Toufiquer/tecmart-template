/*
|-----------------------------------------
| setting up Layout for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

import AuthCheckingComponent from '../components/auth/AuthChecking';
import SiteNavLayoutClickV2 from './site-nav/site-nav-v2/SiteNavLayoutClickV2';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthCheckingComponent redirectUrl="/dashboard">
      <SiteNavLayoutClickV2> {children}</SiteNavLayoutClickV2>;
    </AuthCheckingComponent>
  );
}
