/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SearchBox from '@/app/template6/components/SearchBox'; // Adjust import path as needed

// Mock data for demonstration purposes
const MOCK_RESULTS = [
  { id: 1, title: 'Getting Started with Next.js', category: 'Development' },
  { id: 2, title: 'React Hooks Explained', category: 'Development' },
  { id: 3, title: 'CSS Grid Layout Tutorial', category: 'Design' },
  { id: 4, title: 'TypeScript Best Practices', category: 'Development' },
  { id: 5, title: 'Responsive Design Principles', category: 'Design' },
  { id: 6, title: 'JavaScript Performance Tips', category: 'Development' },
  { id: 7, title: 'UI/UX Design Fundamentals', category: 'Design' },
  { id: 8, title: 'API Integration with Next.js', category: 'Development' },
];

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const queryString = searchParams?.toString() || '';
  const query = queryString.replace('=', ''); // Extract just the query part

  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching search results
  useEffect(() => {
    if (query) {
      setIsLoading(true);

      // Simulate API call delay
      const timer = setTimeout(() => {
        // Filter mock results based on query
        const filteredResults = MOCK_RESULTS.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
        setResults(filteredResults);
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);

  const handleSearch = (newQuery: string) => {
    // In a real app, you'd navigate to the new search URL
    window.history.pushState({}, '', `/template6/search/query?${newQuery}`);

    // Re-run the search (in a real app, this would be handled by the URL change)
    setIsLoading(true);
    const timer = setTimeout(() => {
      const filteredResults = MOCK_RESULTS.filter(item => item.title.toLowerCase().includes(newQuery.toLowerCase()));
      setResults(filteredResults);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/template6" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
            ← Back to Home
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mt-2">Search Results</h1>
        </div>

        {/* Search box for refining search */}
        <div className="mb-8">
          <SearchBox onSearch={handleSearch} placeholder="Refine your search..." autoFocus={false} />
        </div>

        {/* Search query summary */}
        <div className="mb-6 bg-white rounded-lg px-4 py-3 shadow-sm">
          <p className="text-gray-600">
            Showing results for: <span className="font-medium text-gray-900">{query}</span>
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <motion.div
              className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        )}

        {/* Results */}
        {!isLoading && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
            {results.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-4">Found {results.length} results</p>

                {results.map(result => (
                  <motion.div key={result.id} variants={itemVariants} className="bg-white rounded-lg shadow-sm hover:shadow transition-shadow p-4">
                    <h3 className="text-lg font-medium text-gray-900">{result.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Category: {result.category}</p>
                    <div className="mt-2">
                      <Link href={`/template6/result/${result.id}`} className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                        View details →
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try different keywords or broaden your search</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
