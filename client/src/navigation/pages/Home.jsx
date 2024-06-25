import React, { useEffect, useState, useCallback } from "react";

import Movies from "../../components/MoviesComponents/Movies";
import SearchInput from "../../components/input/SearchInput";

function Home() {
  const [data, setData] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    if (debouncedSearch === "") {
      setData("");
    } else {
      setData({ title: debouncedSearch });
    }
  }, [debouncedSearch]);


  const handleSearchChange = (value) => {
      setSearch(value);
    }

  return (
    <div className="Home">
      <div>
        <SearchInput value={search} onSearchChange={handleSearchChange} />
        <Movies data={data}  />
      </div>
    </div>
  );
}

export default Home;
