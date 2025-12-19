import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

type SearchProps = {
  onSearch: (search: string) => void;
};
const Search = ({ onSearch }: SearchProps) => {
  const [search, setSearch] = useState('');

  const handleSearch = (event: React.FormEvent): void => {
    event?.preventDefault();
    onSearch(search.trim());
  };

  return (
    <form
      className="flex flex-row items-center justify-center gap-2 relative z-10"
      onSubmit={handleSearch}
    >
      <label htmlFor="search">
        <input
          type="text"
          id="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-[8rem] ring ring-blue-100/50 rounded
              focus:outline-none focus:ring-white focus:ring"
          placeholder="Search..."
        />
      </label>
      <button className="btn-icon" type="submit">
        <BsSearch />
      </button>
    </form>
  );
};
export default Search;
