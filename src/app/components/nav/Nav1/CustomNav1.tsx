/*
|-----------------------------------------
| setting up CustomNav1 for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

import CustomLink from '@/app/components/nav/CustomLink';

const CustomNav1 = () => {
  type links = {
    name: string;
    url: string;
  }[];
  const links: links = [
    { name: 'Home', url: '/' },
    { name: 'Media', url: '/dashboard/media' },
    { name: 'Route Check', url: '/route-check' },
    { name: 'RTK', url: '/a__1001_users__' },
    { name: 'RTK-all', url: '/dashboard/a__1_1001_users__/all' },
    { name: 'RichText', url: '/a-rich-text' },
    { name: 'Login', url: '/login' },
    { name: 'SignUp', url: '/signup' },
    { name: 'Auth', url: '/auth' },
    { name: 'Template 6', url: '/template6' },
    { name: 'Zustand', url: '/zustand' },
    { name: 'Dashboard', url: '/dashboard' },
  ];

  return (
    <nav className="w-full flex gap-4 items-center justify-end text-center px-4 bg-slate-700 text-slate-400">
      {links.map((i, idx) => (
        <CustomLink i={i} key={i.name + idx} />
      ))}
    </nav>
  );
};
export default CustomNav1;
