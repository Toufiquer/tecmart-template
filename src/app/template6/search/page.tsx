'use client';

import { useState, useEffect, useRef } from 'react';
import SearchBox from './SearchBox';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Loader2, User, X } from 'lucide-react';

// Define a simplified interface for search results to avoid type issues
interface SearchResultItem {
  _id?: string;
  name: string | unknown;
  email: string | unknown;
  alias: string | unknown;
  role: string | unknown;
  createdAt?: Date;
  updatedAt?: Date;
}

// Type guard function to check if a property exists and can be converted to string
function hasValidProperty(item: SearchResultItem, prop: keyof SearchResultItem): boolean {
  return item[prop] != null && item[prop] !== '';
}

export default function SearchBoxRender() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const lastSearchedQuery = useRef('');
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const searchText = useSearchParams();
  const searchTextValue = searchText.get('query');

  useEffect(() => {
    if (searchTextValue) {
      setSearchQuery(searchTextValue);
    }
  }, [searchTextValue]);

  // Execute search when query changes
  useEffect(() => {
    // Clear results if the query is empty
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setTotalResults(0);
      lastSearchedQuery.current = '';
      return;
    }

    // Only execute search if the query is different from what was last searched
    if (searchQuery !== lastSearchedQuery.current) {
      executeSearch(searchQuery);
      lastSearchedQuery.current = searchQuery;
    }
  }, [searchQuery]);

  // Set up periodic refresh for the current search
  useEffect(() => {
    // Clear any existing interval when component unmounts or query changes
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    // Only set up refresh interval if there's an actual query
    if (searchQuery.trim()) {
      refreshIntervalRef.current = setInterval(
        () => {
          // Only refresh if we have a query and we're not already loading
          if (searchQuery.trim() && !isLoading) {
            executeSearch(searchQuery);
          }
        },
        60 * 10 * 1000,
      ); // Refresh every 10 minute
    }

    // Cleanup function to clear interval when component unmounts
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [searchQuery, isLoading]);

  // Handle search input changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Clear search results and query
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setTotalResults(0);
  };

  // The actual search execution function
  const executeSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setTotalResults(0);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Build the search URL with the query parameter
      const searchUrl = `/api/v1/template6/search?q=${encodeURIComponent(query)}`;
      const response = await fetch(searchUrl);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();

      if (result.status >= 400) {
        throw new Error(result.message || 'Error fetching search results');
      }

      setSearchResults(result.data._2_template_ || []);
      setTotalResults(result.data.total || 0);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl my-4 mx-auto">
      {/* Search input with styling */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={e => handleSearch(e.target.value)}
          className="w-full py-3 pl-10 pr-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Search here..."
          autoFocus={false}
        />
        {searchQuery && (
          <button onClick={handleClearSearch} className="absolute inset-y-0 right-0 flex items-center pr-3">
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* Results section */}
      {!isLoading && !error && searchResults.length > 0 && searchQuery.trim().length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 divide-y divide-gray-100">
          <div className="flex items-center justify-between mb-2 pb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Found {totalResults} result{totalResults !== 1 ? 's' : ''}
            </h3>
            {totalResults > searchResults.length && (
              <span className="text-xs text-blue-600 font-medium">
                Showing {searchResults.length} of {totalResults}
              </span>
            )}
          </div>

          <div className="pt-2">
            {searchResults.map((item, index) => (
              <div
                key={item._id?.toString() || index}
                className="group flex items-center p-3 rounded-md hover:bg-blue-50 transition-colors cursor-pointer mb-1 border border-transparent hover:border-blue-100"
              >
                <div className="flex-shrink-0 mr-3 bg-blue-100 rounded-full p-2 group-hover:bg-blue-200">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">{hasValidProperty(item, 'name') ? String(item.name) : 'Unnamed'}</span>
                  {hasValidProperty(item, 'role') && <span className="text-xs text-gray-500">{String(item.role)}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No results message */}
      {!isLoading && !error && searchQuery.trim().length > 0 && searchResults.length === 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">No results found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
}
