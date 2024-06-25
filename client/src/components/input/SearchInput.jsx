import React, { useState } from 'react';

const SearchInput = ({ value, onSearchChange }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    onSearchChange(value);
  };

    return (
      <div className="w-1/2 text-center m-auto" >
        <input className='mt-5 w-1/2 border-blue-500 border-2 rounded-full' type="text" placeholder="Search" value={search} onChange={handleSearchChange} />
      </div>
  );
}


export default SearchInput;