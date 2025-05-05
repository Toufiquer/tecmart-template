/*
|-----------------------------------------
| setting up SearchboxRender for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

'use client';

import SearchBox from './SearchBox';

export default function SearchBoxRender() {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement your search logic here
    // e.g., fetch data from an API, update state, etc.
  };

  return (
    <div className="w-full">
      <SearchBox onSearch={handleSearch} placeholder="Search..." autoFocus={false} />
    </div>
  );
}
