// pages/__104_Users__/[id].js

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { ChevronLeft, Mail, Phone, MapPin, Calendar, Briefcase, Shield, Settings, Share2, Heart, MessageCircle } from 'lucide-react';

import { useGet__103_Users__ByIdQuery } from '../../redux/rtk-Api';
export default function User_103__ProfilePage() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('overview');
  const __104_Users__Id = pathname.split('/')[3];
  const { data: __104_Users__Data } = useGet__103_Users__ByIdQuery(__104_Users__Id, { skip: !__104_Users__Id });

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };
  const __104_Users__ = __104_Users__Data?.data || {};
  return (
    <div>
      <Head>
        <title>{__104_Users__.name} | Profile</title>
        <meta name="description" content={`Profile page for ${__104_Users__.name}`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <motion.button
              className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={() => window.history.back()}
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={20} />
              <span className="ml-1">Back</span>
            </motion.button>

            <div className="flex space-x-3">
              <motion.button className="p-2 rounded-full text-gray-600 hover:bg-gray-100" whileTap={{ scale: 0.95 }}>
                <Share2 size={20} />
              </motion.button>
              <motion.button className="p-2 rounded-full text-gray-600 hover:bg-gray-100" whileTap={{ scale: 0.95 }}>
                <Settings size={20} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Hero Section with Cover Photo */}
        <div className="relative h-48 sm:h-64 lg:h-80 bg-gradient-to-r from-indigo-500 to-purple-600 overflow-hidden">
          {__104_Users__.img && <Image src={__104_Users__.img} alt="Cover photo" fill className="object-cover opacity-40" priority />}
        </div>

        <div className="container mx-auto px-4">
          {/* Profile Info Section */}
          <div className="relative -mt-20 mb-8">
            <motion.div
              className="bg-white rounded-lg shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start">
                  {/* Profile Picture */}
                  <motion.div
                    className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4 sm:mb-0 sm:mr-6"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {__104_Users__.img ? (
                      <Image src={__104_Users__.img} alt={__104_Users__.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <span className="text-4xl text-white font-bold">{__104_Users__.name?.charAt(0) || __104_Users__.alias?.charAt(0) || '?'}</span>
                      </div>
                    )}
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </motion.div>

                  {/* __104_Users__ Info */}
                  <div className="text-center sm:text-left flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <motion.h1 className="text-2xl sm:text-3xl font-bold text-gray-900" {...fadeIn}>
                          {__104_Users__.name}
                        </motion.h1>
                        <motion.p className="text-gray-500 text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                          @{__104_Users__.alias}
                        </motion.p>
                      </div>

                      <div className="mt-4 sm:mt-0 flex space-x-3">
                        <motion.button
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center justify-center"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <MessageCircle size={18} className="mr-2" />
                          Message
                        </motion.button>
                        <motion.button
                          className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium flex items-center justify-center"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Heart size={18} className="mr-2" />
                          Follow
                        </motion.button>
                      </div>
                    </div>

                    <motion.div
                      className="mt-5 flex flex-wrap justify-center sm:justify-start gap-y-3 gap-x-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {__104_Users__.position && (
                        <div className="flex items-center text-gray-600">
                          <Briefcase size={18} className="mr-2" />
                          <span>
                            {__104_Users__.position}
                            {__104_Users__.company ? ` at ${__104_Users__.company}` : ''}
                          </span>
                        </div>
                      )}

                      {__104_Users__.location && (
                        <div className="flex items-center text-gray-600">
                          <MapPin size={18} className="mr-2" />
                          <span>{__104_Users__.location}</span>
                        </div>
                      )}

                      <div className="flex items-center text-gray-600">
                        <Calendar size={18} className="mr-2" />
                        <span>
                          Joined {__104_Users__.joinedDate || new Date(__104_Users__.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Shield size={18} className="mr-2" />
                        <span className="capitalize">{__104_Users__.role?.replace(/__/g, '')}</span>
                      </div>
                    </motion.div>

                    {__104_Users__.bio && (
                      <motion.p className="mt-5 text-gray-700" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        {__104_Users__.bio}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Statistics */}
                <motion.div
                  className="mt-8 flex justify-center sm:justify-start space-x-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{__104_Users__.stats?.posts || 0}</div>
                    <div className="text-sm text-gray-500">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{__104_Users__.stats?.followers || 0}</div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{__104_Users__.stats?.following || 0}</div>
                    <div className="text-sm text-gray-500">Following</div>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Tabs */}
              <div className="border-t border-gray-200">
                <div className="flex overflow-x-auto">
                  {['overview', 'posts', 'photos', 'connections', 'activity'].map(tab => (
                    <motion.button
                      key={tab}
                      className={`px-6 py-4 font-medium whitespace-nowrap ${
                        activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveTab(tab)}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content Area */}
          <motion.div className="bg-white rounded-lg shadow-lg p-6 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="text-gray-500 mr-3" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">Email Address</div>
                      <div className="text-gray-900">{__104_Users__.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="text-gray-500 mr-3" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">Phone Number</div>
                      <div className="text-gray-900">{__104_Users__.phone || 'Not provided'}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="text-gray-500 mr-3" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="text-gray-900">{__104_Users__.location || 'Not provided'}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-semibold mb-6">Account Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-1/4 text-sm text-gray-500">__104_Users__ ID</div>
                      <div className="w-3/4 text-gray-900 break-all">{__104_Users__._id}</div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-1/4 text-sm text-gray-500">Role</div>
                      <div className="w-3/4 text-gray-900 capitalize">{__104_Users__.role?.replace(/__/g, '')}</div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-1/4 text-sm text-gray-500">Alias</div>
                      <div className="w-3/4 text-gray-900">@{__104_Users__.alias}</div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-1/4 text-sm text-gray-500">Created</div>
                      <div className="w-3/4 text-gray-900">{new Date(__104_Users__.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'overview' && (
              <div className="py-12 text-center">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
                  <h3 className="text-xl font-medium text-gray-600">No {activeTab} to display yet</h3>
                  <p className="mt-2 text-gray-500">This section is currently empty.</p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
