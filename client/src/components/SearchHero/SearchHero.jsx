import React from "react";
import "./searchHero.scss";

import { HiOutlineSearchCircle } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";


const SearchHero = ({ darkTheme }) => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      mb={6}
      className="columns search-hero"
    >
      <div className="column job-search-hero">
        <h5
          className={darkTheme ? "job-search-title-dark" : "job-search-title"}
        >
          Find a Remote Web 3.0 Job
        </h5>
        <p className={darkTheme ? "job-search-desc-dark" : "job-search-desc"}>
          Discover remote Web3 Jobs around the world at companies working on{" "}
          <br />
          blockchain, smart contract, DeFi, NFT, crypto etc. Connect and hire{" "}
          <br />
          remote workers in web3 space.
        </p>
        <input className="job-search-input" placeholder="Web developer" />
        <div className="job-search-buttons">
          <button className="search-button">
            <span>Search job</span>
            <span class="icon">
              <HiOutlineSearchCircle />
            </span>
          </button>
          <button className="clear-button">
            <span>Clear input</span>
            <span class="icon">
              <AiOutlineCloseCircle />
            </span>
          </button>
        </div>
      </div>
      <div
        className={
          !darkTheme
            ? "column job-hero-image has-text-centered"
            : "column job-hero-image has-text-centered dark"
        }
      >
        <div />
      </div>
    </motion.div>
  );
};

export default SearchHero;
