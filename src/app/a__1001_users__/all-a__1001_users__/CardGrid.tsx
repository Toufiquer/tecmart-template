// __104_Users__CardGrid.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IUsers_101__ } from '../api/v1/Model';
import Link from 'next/link';

const __103_Users__Card = ({ __104_Users__ }: { __104_Users__: IUsers_101__ }) => {
  return (
    <Link href={`/a__1001_users__/all-a__1001_users__/${__104_Users__._id as string}`} passHref>
      <motion.div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300" whileHover={{ y: -5 }} layout>
        <div className="relative h-48 w-full">
          {__104_Users__.img ? (
            <Image src={__104_Users__.img as string} alt={(__104_Users__.name as string) || '__103_Users__'} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
              <span className="text-4xl text-white font-bold">
                {(__104_Users__.name as string)?.charAt(0) || (__104_Users__.alias as string)?.charAt(0) || '?'}
              </span>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
          </div>
        </div>

        <motion.div className="p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <motion.h3 className="text-xl font-semibold text-gray-800 mb-1 truncate" whileHover={{ scale: 1.02 }}>
            {(__104_Users__.name as string) || 'Unknown __103_Users__'}
          </motion.h3>

          <p className="text-gray-500 text-sm mb-2">@{(__104_Users__.alias as string) || 'noalias'}</p>

          <div className="flex items-center justify-between">
            <span className="inline-block px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full">
              {typeof __104_Users__.role === 'string' ? __104_Users__.role.replace(/__/g, '') : 'Member'}
            </span>
            <motion.button className="text-indigo-600 text-sm font-medium hover:text-indigo-800" whileTap={{ scale: 0.95 }}>
              View Profile
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

const __103_Users__CardGrid = ({ users_102__ }: { users_102__: IUsers_101__[] }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold text-center mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        __103_Users__ Directory
      </motion.h1>

      <motion.div
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {users_102__.map((__104_Users__, index) => (
          <motion.div
            key={(__104_Users__._id as string) || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <__103_Users__Card __104_Users__={__104_Users__} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default __103_Users__CardGrid;
