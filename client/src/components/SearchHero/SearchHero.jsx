import React from "react";
import "./searchHero.scss";

import { HiOutlineSearchCircle } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import bg from "./bg4.png";
import bg2 from "./bg5.png";

// import HeroImage from "../../assets/images/RoomScreenshot.png";

const SearchHero = ({ darkTheme, search, setSearch, searchHandler }) => {
  const clearSearch = () => {
    setSearch("");
    searchHandler("");
  };

  return (
    <div className="search-hero-container">
      <img src={bg} className="bg" />
      <img src={bg2} className="bg2" />
      <div className="columns search-hero">
        <div className="column job-search-hero is-12">
          <h5
            className={darkTheme ? "job-search-title-dark" : "job-search-title"}
          >
            Find a Remote Job Fast!
          </h5>
          <p className={darkTheme ? "job-search-desc-dark" : "job-search-desc"}>
            Discover remote Jobs around the world at companies working on <br />
            <span style={{ color: "#1a759f", fontWeight: "500" }}>
              blockchain, smart contract, DeFi, NFT, crypto
            </span>{" "}
            etc.
            <br />
            Connect and hire remote workers.
          </p>
          <input
            className="job-search-input"
            placeholder="E.g. Web developer, software engineer, graphic designer etc."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            autoFocus
          />
          <div className="job-search-buttons">
            <button
              className="search-button"
              onClick={() => searchHandler(search)}
            >
              <span>Search job</span>
            </button>
            <button className="clear-button" onClick={clearSearch}>
              <span>Clear input</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
