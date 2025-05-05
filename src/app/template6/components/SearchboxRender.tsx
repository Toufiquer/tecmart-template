'use client';

import { useState, useEffect, useRef } from 'react';
import SearchBox from './SearchBox';

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

export default function SearchBoxRender() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const lastSearchedQuery = useRef('');
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Execute search when query changes
  useEffect(() => {
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
    <div className="w-full space-y-4">
      <SearchBox onSearch={handleSearch} placeholder="Search here ..." autoFocus={false} />

      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && <div className="p-4 text-red-700 bg-red-100 rounded-md">{error}</div>}

      {!isLoading && !error && searchResults.length > 0 && (
        <div>
          <p className="mb-2 text-sm text-gray-600">
            Found {totalResults} result{totalResults !== 1 ? 's' : ''}
          </p>
          <div className="space-y-2">
            {searchResults.map(item => (
              <div key={item._id?.toString()} className="p-4 border rounded-md hover:bg-gray-50">
                <h3 className="font-medium">{String(item.name)}</h3>
                <p className="text-gray-600">{String(item.email)}</p>
                <p className="text-sm text-gray-500">
                  Role: {String(item.role)} | Alias: {String(item.alias)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
