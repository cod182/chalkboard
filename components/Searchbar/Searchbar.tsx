'use client';

import { FormEvent, useState } from 'react';

const isValidAmazonUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    if (
      hostname.includes('amazon.') ||
      hostname.includes('amazon.co.uk') ||
      hostname.includes('amazon.com') ||
      hostname.endsWith('amazon')
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
};

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [linkProvided, setLinkProvided] = useState(false);
  const [validLink, setValidLink] = useState(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidLink = isValidAmazonUrl(searchPrompt);
    setLinkProvided(true);

    if (!isValidLink) {
      setValidLink(false);
      return alert('Link not valid. Please enter and amazon link');
    } else {
      setValidLink(true);
    }

    try {
      setIsLoading(true);
      // Scraping
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap4 mt-12" onSubmit={handleSubmit}>
      <input
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        type="text"
        placeholder="Enter Product Link"
        className={`searchbar-input mr-2 ${
          linkProvided
            ? validLink
              ? 'border-green-400'
              : 'border-red-600'
            : null
        }`}
      />
      <button
        disabled={searchPrompt === ''}
        type="submit"
        className="searchbar-btn"
      >
        {isLoading ? 'Searching' : 'Search'}
      </button>
    </form>
  );
};

export default Searchbar;
