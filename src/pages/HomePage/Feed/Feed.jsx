/* eslint-disable react/prop-types */
import "./Styles/Feed.css";
import { useState } from "react";

export default function Feed() {
  const [filterFeed, setFilterFeed] = useState([true, false]);

  const handleFilter = () => setFilterFeed(!filterFeed);

  return (
    <div className="Feed">
      <nav>
        <FeedFilter
          text="Recientes"
          active={filterFeed[0]}
          setFilterFeed={setFilterFeed}
          filterFeed={filterFeed}
        />
        <FeedFilter
          text="Populares"
          active={filterFeed[1]}
          setFilterFeed={setFilterFeed}
          filterFeed={filterFeed}
        />
      </nav>
    </div>
  );
}

function FeedFilter({ text, active, setFilterFeed, filterFeed }) {
  const handle = () => setFilterFeed([!filterFeed[0], !filterFeed[1]]);

  return (
    <button onClick={handle} className={active ? "active" : ""}>
      {text}
    </button>
  );
}
