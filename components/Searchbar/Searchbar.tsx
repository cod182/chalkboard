'use client';

import { FormEvent, useState } from 'react';

const isValidAmazonUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
  } catch (error) {}
};

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const isValidLink = isValidAmazonUrl(searchPrompt);
};

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');

  return (
    <form className="flex flex-wrap gap4 mt-12" onSubmit={handleSubmit}>
      <input
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        type="text"
        placeholder="Enter Product Link"
        className="searchbar-input"
      />
      <button type="submit" className="searchbar-btn">
        Search
      </button>
    </form>
  );
};

export default Searchbar;
