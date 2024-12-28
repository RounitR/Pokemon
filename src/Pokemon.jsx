import React, { useEffect, useState } from "react";
import { Grid, Pagination, Box, Typography, Button } from "@mui/material";
import { PokemonCards } from "./PokemonCards";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

export const Pokemon = ({ search, pokemon }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("");
  const handleSort = (type) => {
    setSortType(type);
    setCurrentPage(1); // Reset to page 1 after sorting
  };
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const storedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedPokemon")) || [];
    setBookmarkedIds(storedBookmarks);
  }, []);
  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      const updatedBookmarks = prev.includes(id)
        ? prev.filter((cardId) => cardId !== id) // Remove bookmark
        : [...prev, id]; // Add bookmark

      // Save updated bookmarks to localStorage
      localStorage.setItem(
        "bookmarkedPokemon",
        JSON.stringify(updatedBookmarks)
      );
      return updatedBookmarks;
    });
  };

  // Filter search results
  const searchData = pokemon
    .filter((curPokemon) => {
      // Show only bookmarked Pokémon if "Show Bookmarked" is active
      if (showBookmarks) {
        return bookmarkedIds.includes(curPokemon.id);
      }
      return curPokemon.name.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (sortType === "name") {
        return a.name.localeCompare(b.name); // Sort alphabetically
      }
      if (sortType === "id") {
        return a.id - b.id; // Sort by ID
      }
      return 0; // Default, no sorting
    });
  const cardsPerPage = 12; // Number of cards per page

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = searchData.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(searchData.length / cardsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <div className="flex sm:flex-row flex-col w-screen sm:items-center items-start justify-center mb-10 sm:space-x-4 space-y-2">
        <div
          className="space-x-2 flex items-center p-2 bg-blue-100 rounded-md px-4 cursor-pointer hover:bg-blue-200"
          onClick={() => handleSort("name")}
        >
          <FaSortAlphaDown className="text-blue-500 text-3xl" />
          <p>Sort by Name</p>
        </div>
        <div
          className="space-x-2 flex items-center p-2 bg-blue-100 rounded-md px-4 cursor-pointer hover:bg-blue-200"
          onClick={() => handleSort("id")}
        >
          <FaSortAlphaDown className="text-blue-500 text-3xl" />
          <p>Sort by ID</p>
        </div>
        <div
          className="space-x-2 flex items-center p-2 bg-blue-100 rounded-md px-4 cursor-pointer hover:bg-blue-200 justify-center"
          onClick={() => setShowBookmarks((prev) => !prev)}
        >
          <FaBookmark className="text-blue-500 text-3xl" />
          <p className="w-60 flex items-center justify-center">{showBookmarks ? "Show All" : "Show Bookmarked"}</p>
        </div>
      </div>
      {searchData.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Typography variant="h4" color="textSecondary">
            No Data Found
          </Typography>
        </Box>
      ) : (
        <>
          {/* Grid Section */}
          <Grid container spacing={2}>
            {currentCards.map((curPokemon) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={curPokemon.id}>
                <PokemonCards
                  pokemonData={curPokemon}
                  toggleBookmark={toggleBookmark}
                  isBookmarked={bookmarkedIds.includes(curPokemon.id)}
                />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
};
