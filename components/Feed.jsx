"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search and filter states
  const [searchText, setSearchText] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("all"); // Default filter criteria
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  // Fetch all posts
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter prompts based on search text and selected criteria
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter((item) => {
      if (filterCriteria === "tag") {
        return regex.test(item.tag);
      }else if (filterCriteria === "prompt") {
        return regex.test(item.prompt);
      }
      // Default to searching across all fields
      return (
        
        regex.test(item.tag) ||
        regex.test(item.prompt)
      );
    });
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex flex-col items-center gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for a tag, username, or prompt"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer mt-5"
        />

        {/* Filter Options */}
        <div className="flex gap-4 ">

          <label>
            <input
              type="radio"
              value="tag"
              checked={filterCriteria === "tag"}
              onChange={() => setFilterCriteria("tag")}
            />
            Tag
          </label>

          <label>
            <input
              type="radio"
              value="prompt"
              checked={filterCriteria === "prompt"}
              onChange={() => setFilterCriteria("prompt")}
            />
            Prompt
          </label>
        </div>
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
