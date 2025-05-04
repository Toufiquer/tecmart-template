// _4_template_CardGrid.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { I_3_template_ } from '@/app/api/v1/template6/filename7Model';
import Link from 'next/link';

const _3_template_Card = ({ _4_template_ }: { _4_template_: I_3_template_ }) => {
  return (
    <Link href={`/template6/all-template6/${_4_template_._id as string}`} passHref>
      <motion.div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300" whileHover={{ y: -5 }} layout>
        <div className="relative h-48 w-full">
          {_4_template_.img ? (
            <Image src={_4_template_.img as string} alt={(_4_template_.name as string) || '_3_template_'} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
              <span className="text-4xl text-white font-bold">{(_4_template_.name as string)?.charAt(0) || (_4_template_.alias as string)?.charAt(0) || '?'}</span>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
          </div>
        </div>

        <motion.div className="p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <motion.h3 className="text-xl font-semibold text-gray-800 mb-1 truncate" whileHover={{ scale: 1.02 }}>
            {(_4_template_.name as string) || 'Unknown _3_template_'}
          </motion.h3>

          <p className="text-gray-500 text-sm mb-2">@{(_4_template_.alias as string) || 'noalias'}</p>

          <div className="flex items-center justify-between">
            <span className="inline-block px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full">
              {typeof _4_template_.role === 'string' ? _4_template_.role.replace(/__/g, '') : 'Member'}
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

const _3_template_CardGrid = ({ _2_template_ }: { _2_template_: I_3_template_[] }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold text-center mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        _3_template_ Directory
      </motion.h1>

      <motion.div
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {_2_template_.map((_4_template_, index) => (
          <motion.div key={(_4_template_._id as string) || index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <_3_template_Card _4_template_={_4_template_} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default _3_template_CardGrid;
