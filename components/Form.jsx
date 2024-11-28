//////final
import React from 'react'
import Link from 'next/link'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-x-full flex-start flex-col">
      <h1 className="head_text text_left">
        <span className="blue_gradient">{type} Post</span>
      </h1>

      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit} // Make sure form submit triggers handleSubmit
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorpism"
      >
        <label>
          <span className="font-semibold text-base text-gray-700">Your AI prompt</span>
        </label>
        <textarea
          value={post.prompt}
          onChange={(e) =>
            setPost({
              ...post,
              prompt: e.target.value,
            })
          }
          placeholder="Write your prompt here"
          className="form_textarea"
        />

        <label>
          <span className="font-semibold text-base text-gray-700">
            Tag{' '}
            <span>
              (#product, #webdevelopment, #idea)
            </span>
          </span>
        </label>
        <input
          value={post.tag}
          onChange={(e) =>
            setPost({
              ...post,
              tag: e.target.value,
            })
          }
          placeholder="#tag"
          className="form_textarea"
        />

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm ml-5 rounded-full text-black bg-orange-500"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form


/*
import React, { useState } from 'react';
import Link from 'next/link';

const Form = ({ type, post, setPost, submitting, handleSubmit, allData }) => {
  const [filteredData, setFilteredData] = useState([]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setPost({
      ...post,
      prompt: input,
    });

    // Filter data based on user input
    const filtered = allData.filter((item) =>
      item.prompt.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <section className="w-full max-x-full flex-start flex-col">
      <h1 className="head_text text_left">
        <span className="blue_gradient">{type} Post</span>
      </h1>

      <p className="desc text-left max-w-md">
        {type} and explore data that matches your input dynamically!
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-semibold text-base text-gray-700">
            Search Data
          </span>
        </label>
        <input
          value={post.prompt}
          onChange={handleInputChange}
          placeholder="Type to search..."
          className="form_textarea"
        />

        <div className="filtered-results mt-5">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="filtered-item p-2 border-b border-gray-300"
              >
                <h3 className="font-bold text-lg">{item.prompt}</h3>
                <p className="text-sm text-gray-600">Tag: {item.tag}</p>
                <p className="text-sm text-gray-500">
                  Created By: {item.username}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No matching data found.</p>
          )}
        </div>

        <div className="flex-end mx-3 mb-5 gap-4 ">
          <Link href="/" className="px-5 py-2 text-sm ml-5 rounded-full text-black bg-black text-white">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm ml-5 rounded-full text-black bg-orange-500"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
*/