/*
|-----------------------------------------
| setting up SideNavData for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

import { IconType } from 'react-icons/lib';
import { MdOutlineManageAccounts } from 'react-icons/md';

type CustomButtonType = {
  id: number;
  parentTitle: string;

  icon?: null | IconType;
  children: { id: number; title: string; url: string; icon?: IconType | null }[];
};

const data: CustomButtonType[] = [
  {
    id: 1,
    parentTitle: 'Users',
    children: [
      { id: 101, title: 'All Users', url: '/dashboard/users/all' },
      { id: 102, title: 'Trash Users', url: '/dashboard/users/trash' },
    ],
  },
  {
    id: 2,
    parentTitle: 'Shops',
    children: [
      { id: 201, title: 'All Shops', url: '/dashboard/shops/all' },
      { id: 202, title: 'Trash Shops', url: '/dashboard/shops/trash' },
      { id: 203, title: 'Digital Shops', url: '/dashboard/shops/digital' },
      { id: 204, title: 'Physical Shops', url: '/dashboard/shops/physical' },
    ],
  },
  {
    id: 3,
    parentTitle: 'Products',
    children: [
      { id: 301, title: 'All Products', url: '/dashboard/products/all' },
      { id: 302, title: 'Trash Products', url: '/dashboard/products/trash' },
      { id: 303, title: 'Digital Products', url: '/dashboard/products/digital' },
      { id: 304, title: 'Physical Products', url: '/dashboard/products/physical' },
    ],
  },
  {
    id: 4,
    parentTitle: 'Orders',
    children: [
      { id: 401, title: 'All Orders', url: '/dashboard/orders/all' },
      { id: 402, title: 'Trash Orders', url: '/dashboard/orders/trash' },
    ],
  },
  {
    id: 5,
    parentTitle: 'Category',
    children: [
      { id: 501, title: 'All Category', url: '/dashboard/category/all' },
      { id: 502, title: 'Trash Category', url: '/dashboard/category/trash' },
    ],
  },
  {
    id: 6,
    parentTitle: 'Pickup Points',
    children: [
      { id: 601, title: 'All Pickup Points', url: '/dashboard/pickup-points/all' },
      { id: 602, title: 'Trash Pickup Points', url: '/dashboard/pickup-points/trash' },
    ],
  },
  {
    id: 7,
    parentTitle: 'Blogs',
    children: [
      { id: 701, title: 'All Blogs', url: '/dashboard/blogs/all' },
      { id: 702, title: 'Trash Blogs', url: '/dashboard/blogs/trash' },
    ],
  },
  {
    id: 8,
    parentTitle: 'Files',
    children: [
      { id: 801, title: 'All Files', url: '/dashboard/files/all' },
      { id: 802, title: 'Trash Files', url: '/dashboard/files/trash' },
    ],
  },
  {
    id: 9,
    parentTitle: 'Marketing',
    children: [
      { id: 901, title: 'All Marketing', url: '/dashboard/marketing/all' },
      { id: 902, title: 'Trash Marketing', url: '/dashboard/marketing/trash' },
    ],
  },
  {
    id: 10,
    parentTitle: 'Support',
    children: [
      { id: 1001, title: 'All Support', url: '/dashboard/support/all' },
      { id: 1002, title: 'Trash Support', url: '/dashboard/support/trash' },
    ],
  },
  {
    id: 11,
    parentTitle: 'Coupon',
    children: [
      { id: 1101, title: 'All Coupon', url: '/dashboard/coupon/all' },
      { id: 1102, title: 'Trash Coupon', url: '/dashboard/coupon/trash' },
    ],
  },
  {
    id: 12,
    parentTitle: 'Reports',
    children: [
      { id: 1201, title: 'All Reports', url: '/dashboard/reports/all' },
      { id: 1202, title: 'Trash Reports', url: '/dashboard/reports/trash' },
    ],
  },
  {
    id: 13,
    parentTitle: 'Landing Page',
    children: [
      { id: 1301, title: 'All Landing Page', url: '/dashboard/landing-page/all' },
      { id: 1302, title: 'Trash Landing Page', url: '/dashboard/landing-page/trash' },
    ],
  },
  {
    id: 14,
    parentTitle: 'Banners',
    children: [
      { id: 1401, title: 'All Banners', url: '/dashboard/banners/all' },
      { id: 1402, title: 'Trash Banners', url: '/dashboard/banners/trash' },
    ],
  },
  {
    id: 15,
    parentTitle: 'Payments Gateway',
    children: [
      { id: 1501, title: 'All Payments Gateway', url: '/dashboard/payments-gateway/all' },
      { id: 1502, title: 'Trash Payments Gateway', url: '/dashboard/payments-gateway/trash' },
    ],
  },
  {
    id: 16,
    parentTitle: 'Site Setting',
    children: [
      { id: 1601, title: 'All Site Setting', url: '/dashboard/site-setting/all' },
      { id: 1602, title: 'Trash Site Setting', url: '/dashboard/site-setting/trash' },
    ],
  },
  {
    // Assuming this is the 17th item despite the numbering
    id: 17,
    parentTitle: 'Landing Products',
    children: [
      { id: 1701, title: 'All Landing Products', url: '/dashboard/landing-products/all' },
      { id: 1702, title: 'Trash Landing Products', url: '/dashboard/landing-products/trash' },
    ],
  },
];
export default data.map(curr => {
  const i = { ...curr };
  i.icon = MdOutlineManageAccounts;
  if (i.children.length > 0) {
    i.children = i.children.map(c => ({ ...c, icon: MdOutlineManageAccounts }));
  }
  return i;
});
