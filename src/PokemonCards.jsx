import React, { useState } from "react";
import { capitalize, Chip } from "@mui/material";
import { FaBookmark } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";

export const PokemonCards = ({ pokemonData, toggleBookmark, isBookmarked }) => {
  const [flippedCard, setFlippedCard] = useState("");
  const handleSelectCard = (id) => {
    setFlippedCard(id);
  };
  const handleBack = () => {
    setFlippedCard(""); // Reset the flipped card state to null
  };
  return (
    <div
      key={pokemonData.id}
      className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 cursor-pointer min-h-full"
    >
      {flippedCard === pokemonData.id ? (
        <div className="flex flex-col w-full h-full p-4">
          <div className="flex w-full items-center space-x-3 justify-between">
            <div
              className="space-x-2 flex items-center text-3xl"
              onClick={handleBack}
            >
              <FaChevronLeft />
              <p>Back</p>
            </div>
            <Chip label={capitalize(pokemonData.name)} variant="outlined" />
          </div>
          <div className="flex flex-col space-y-4 p-4">
            <p className="mb-2">
              <strong>Height:</strong> {pokemonData.height}
            </p>
            <p className="mb-2">
              <strong>Weight:</strong> {pokemonData.weight}
            </p>
            <p className="mb-2">
              <strong>Base Experience:</strong> {pokemonData.base_experience}
            </p>
          </div>
        </div>
      ) : (
        <>
          <img
            src={pokemonData.sprites.other.dream_world.front_default}
            alt={pokemonData.name}
            className="w-full h-72 object-contain hover:scale-105 transition-transform duration-300"
          />
          <div className="p-6 bg-blue-50">
            <h2 className="text-3xl font-semibold mb-2">
              {capitalize(pokemonData.name)}
            </h2>
            <div className="flex justify-between items-center">
              <button
                onClick={() => toggleBookmark(pokemonData.id)}
                className={`flex items-center space-x-1 ${
                  isBookmarked ? "text-blue-500" : "text-gray-500"
                } hover:text-blue-500 transition-colors duration-300`}
                aria-label={`Bookmark ${pokemonData.name}`}
              >
                <FaBookmark />
                <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
              </button>
              <button
                className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300"
                aria-label={`View API Docs for ${pokemonData.name}`}
                onClick={() => handleSelectCard(pokemonData.id)}
              >
                <span>View More</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
