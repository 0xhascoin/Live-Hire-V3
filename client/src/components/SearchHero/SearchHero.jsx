import React from "react";
import "./searchHero.scss";

import { HiOutlineSearchCircle } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import bg from "./bg4.png";
import bg2 from "./bg5.png";

// import HeroImage from "../../assets/images/RoomScreenshot.png";
import {BsFillBriefcaseFill} from 'react-icons/bs';


const SearchHero = ({ darkTheme, search, setSearch, searchHandler }) => {
  const clearSearch = () => {
    setSearch("");
    searchHandler("");
  };

  return (
    <div className="search-hero-container has-text-centered">
      {/* <img src={bg} className="bg" />
      <img src={bg2} className="bg2" /> */}
      <div className="columns search-hero has-text-centered">
        <div className="column job-search-hero is-12">
          <p className="tag is-info is-light">
            The best job seekers in the world 🎉
          </p>
          <h1 className={darkTheme ? "hero-title-text dark": "hero-title-text"}>
            Find and become a {""}
            <span className="hero-title-highlight">
              professional
            </span> 
            {" "}
            with passion
          </h1>
          <p className={darkTheme ? "hero-description-text dark" : "hero-description-text"}>
            Job search platform worldwide 🌍. <br/>
            We connect job seekers and companies 
            in an easy one stop hiring solution. 🎯
          </p>
        {/*
          <div className={darkTheme ? "tags-container dark " : "tags-container"}>
            <button className="tag">front-end</button>
            <button className="tag">solidity</button>
            <button className="tag">javascript</button>
            <button className="tag">entry level</button>
            <button className="tag">remote</button>
            <button className="tag">back-end</button>
            <button className="tag">senior</button>
            <button className="tag">vue js</button>
            <button className="tag">react js</button>

          </div>
          */}
        {/*
          <input
            className="job-search-input"
            placeholder="E.g. Web developer, software engineer, graphic designer etc."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            autoFocus
          />
          <div className="job-search-buttons">
            <button
              className={darkTheme ? "search-button dark" : "search-button"}
              onClick={() => searchHandler(search)}
            >
              <span>Search job</span>
            </button>
            <button className="clear-button" onClick={clearSearch}>
              <span>Clear input</span>
            </button>
          </div>
          */}
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
