/*
|-----------------------------------------
| setting up SearchBox for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, Search, X } from 'lucide-react';
import Link from 'next/link';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export default function SearchBox({ onSearch, placeholder = 'Search...', className = '', autoFocus = false }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 3 || query.length === 0) {
        setDebouncedQuery(query);
        setError('');
      } else {
        setError('Minimum 3 characters needed');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    setError('');
  };

  // Container animation variants
  const containerVariants = {
    idle: {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    focused: {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
  };

  // Input field animation variants
  const inputVariants = {
    idle: {
      width: '100%',
    },
    focused: {
      width: '100%',
    },
  };

  // Clear button animation variants
  const clearButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  // Error message animation variants
  const errorVariants = {
    hidden: { opacity: 0, height: 0, y: -10 },
    visible: { opacity: 1, height: 'auto', y: 0 },
  };

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`}>
      <motion.div
        className={`relative rounded-full overflow-hidden bg-white border ${
          error ? 'border-red-300' : 'border-gray-300'
        } ${isFocused ? 'ring-2 ring-blue-200' : ''}`}
        initial="idle"
        animate={isFocused ? 'focused' : 'idle'}
        variants={containerVariants}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center px-4 py-2">
          <motion.div initial={{ scale: 1 }} animate={{ scale: isFocused || query ? 1.1 : 1 }} transition={{ duration: 0.2 }} className="text-gray-500 mr-2">
            <Search size={20} />
          </motion.div>

          <motion.input
            type="text"
            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
            placeholder={placeholder}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoFocus={autoFocus}
            variants={inputVariants}
            transition={{ duration: 0.3 }}
          />

          <AnimatePresence>
            {query && (
              <motion.button
                onClick={handleClear}
                className="text-gray-500 hover:text-gray-700 ml-2"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={clearButtonVariants}
                transition={{ duration: 0.2 }}
                aria-label="Clear search"
              >
                <X size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              className="text-red-500 text-xs p-1 px-4 bg-red-50"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={errorVariants}
              transition={{ duration: 0.2 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Example search results container */}
      {debouncedQuery.length >= 3 && (
        <motion.div
          className="mt-2 rounded-lg bg-white shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Link
            href={`/template6/search?${debouncedQuery}`}
            className="p-3 block bg-white rounded-lg shadow-sm transition-all duration-300 hover:bg-blue-50 hover:shadow-md"
          >
            <div className="flex items-center">
              <CheckIcon size={16} className="text-blue-500 mr-2" />
              <p className="text-sm text-gray-600">
                Search for: <span className="font-medium text-gray-800">{debouncedQuery}</span>
              </p>
            </div>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
