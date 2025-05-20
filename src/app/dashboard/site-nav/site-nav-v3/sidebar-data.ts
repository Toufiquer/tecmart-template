/*
|-----------------------------------------
| setting up sidebar-data for the app
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, May, 2024
|-----------------------------------------
*/
import { Url } from 'url';
import { ReactNode } from 'react';
import { iconBiPieChartAlt } from '../site-nav-v4/side-nav-react-icons';

export type LINKTYPE = {
  name: string;
  link: Url | string;
  badge?: string;
  id?: string | number;
  icon?: ReactNode | string;
};

export type SIDEBARTYPE = {
  id?: string | number;
  name: string;
  icon?: ReactNode | null;
  content: Array<LINKTYPE>;
  isDropdown?: boolean;
  isActive?: boolean;
  link?: Url | string;
};

export const sidebarDataHome: SIDEBARTYPE[] = [
  {
    id: 10001,
    name: 'a__1_1001_users__',
    icon: iconBiPieChartAlt,
    content: [{ id: 1000101, name: 'a__1_1001_users__', link: '/dashboard/a__1_1001_users__/all', icon: iconBiPieChartAlt }],
  },
  {
    id: 1,
    name: 'Users',
    icon: iconBiPieChartAlt,
    content: [{ id: 101, name: 'All Users', link: '/dashboard/users/all', icon: iconBiPieChartAlt }],
  },
  {
    id: 2,
    name: 'Shops',
    icon: iconBiPieChartAlt,
    content: [
      { id: 201, name: 'All Shops', link: '/dashboard/shops/all', icon: iconBiPieChartAlt },
      { id: 203, name: 'Digital Shops', link: '/dashboard/shops/digital', icon: iconBiPieChartAlt },
      { id: 204, name: 'Physical Shops', link: '/dashboard/shops/physical', icon: iconBiPieChartAlt },
    ],
  },
  {
    id: 3,
    name: 'Products',
    icon: iconBiPieChartAlt,
    content: [
      { id: 301, name: 'All Products', link: '/dashboard/products/all', icon: iconBiPieChartAlt },
      { id: 303, name: 'Digital Products', link: '/dashboard/products/digital', icon: iconBiPieChartAlt },
      { id: 304, name: 'Physical Products', link: '/dashboard/products/physical', icon: iconBiPieChartAlt },
    ],
  },
  {
    id: 4,
    name: 'Orders',
    icon: iconBiPieChartAlt,
    content: [{ id: 401, name: 'All Orders', link: '/dashboard/orders/all', icon: iconBiPieChartAlt }],
  },
  {
    id: 5,
    name: 'Category',
    icon: iconBiPieChartAlt,
    content: [{ id: 501, name: 'All Category', link: '/dashboard/category/all', icon: iconBiPieChartAlt }],
  },
  {
    id: 6,
    name: 'Pickup Points',
    icon: iconBiPieChartAlt,
    content: [{ id: 601, name: 'All Pickup Points', link: '/dashboard/pickup-points/all', icon: iconBiPieChartAlt }],
  },
  {
    id: 6001,
    name: 'Media',
    icon: iconBiPieChartAlt,
    content: [
      { id: 60001, name: 'All', link: '/dashboard/media', icon: iconBiPieChartAlt },
      { id: 60002, name: 'Trash', link: '/dashboard/media/trash', icon: iconBiPieChartAlt },
    ],
  },
  {
    id: 7,
    name: 'Blogs',
    icon: iconBiPieChartAlt,
    content: [{ id: 701, name: 'All Blogs', link: '/dashboard/blogs/all', icon: iconBiPieChartAlt }],
  },
  {
    id: 8,
    name: 'Files',
    icon: iconBiPieChartAlt,
    content: [{ id: 801, name: 'All Files', link: '/dashboard/files/all', icon: iconBiPieChartAlt }],
  },
  {
    id: 9,
    name: 'Marketing',
    icon: iconBiPieChartAlt,
    content: [{ id: 901, name: 'All Marketing', link: '/dashboard/marketing/all', icon: iconBiPieChartAlt }],
  },
  {
    id: 10,
    name: 'Support',
    icon: iconBiPieChartAlt,
    content: [{ id: 1001, name: 'All Support', link: '/dashboard/support/all', icon: iconBiPieChartAlt }],
  },
  {
    id: 11,
    name: 'Coupon',
    icon: iconBiPieChartAlt,
    content: [{ id: 1101, name: 'All Coupon', link: '/dashboard/coupon/all', icon: iconBiPieChartAlt }],
  },
  {
    id: 12,
    name: 'Reports',
    icon: iconBiPieChartAlt,
    content: [{ id: 1201, name: 'All Reports', link: '/dashboard/reports/all', icon: iconBiPieChartAlt }],
  },
  {
    id: 13,
    name: 'Landing Page',
    icon: iconBiPieChartAlt,
    content: [{ id: 1301, name: 'All Landing Page', link: '/dashboard/landing-page/all', icon: iconBiPieChartAlt }],
  },
  {
    id: 14,
    name: 'Banners',
    icon: iconBiPieChartAlt,
    content: [{ id: 1401, name: 'All Banners', link: '/dashboard/banners/all', icon: iconBiPieChartAlt }],
  },
  {
    id: 15,
    name: 'Payments Gateway',
    icon: iconBiPieChartAlt,
    content: [{ id: 1501, name: 'All Payments Gateway', link: '/dashboard/payments-gateway/all', icon: iconBiPieChartAlt }],
  },
  {
    id: 16,
    name: 'Site Setting',
    icon: iconBiPieChartAlt,
    content: [{ id: 1601, name: 'All Site Setting', link: '/dashboard/site-setting/all', icon: iconBiPieChartAlt }],
  },
  {
    id: 17,
    name: 'Landing Products',
    icon: iconBiPieChartAlt,
    content: [{ id: 1701, name: 'All Landing Products', link: '/dashboard/landing-products/all', icon: iconBiPieChartAlt }],
  },
];
