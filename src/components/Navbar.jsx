import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import React from "react";
import { IoSearchCircleOutline } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";

const Navbar = ({ search, setSearch }) => {
  return (
    <div className="w-screen fixed bg-black shadow-lg border-b p-4 flex sm:flex-row flex-col items-center justify-between text-white px-10">
      <p className="text-5xl hidden sm:flex">
        <span className="text-yellow-500 text-5xl">Catch </span>{" "}
        <span className="text-blue-700 text-5xl">Train, {" "}</span>  Battle!
      </p>
      <div className="flex items-center space-x-3">
        <FormControl fullWidth sx={{ m: 1, width: "55ch" }} variant="standard">
          <InputLabel
            htmlFor="standard-adornment-amount"
            sx={{ color: "white", fontSize: "1.5rem" }}
          >
            Search Pokemon
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              color: "white", // Make input text white
              "& .MuiInputBase-input": { color: "white" }, // For text in the input
              "&:before": { borderBottomColor: "white" }, // Normal state underline
              "&:hover:not(.Mui-disabled):before": {
                borderBottomColor: "white",
              }, // Hover underline
              "&:after": { borderBottomColor: "white" }, // Focused underline
            }}
            startAdornment={
              <InputAdornment position="start">
                <IoSearchSharp style={{ color: "white" }} size={20} />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </div>
  );
};

export default Navbar;
