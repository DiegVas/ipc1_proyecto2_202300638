/* eslint-disable react/prop-types */
function FeedFilter({ text, active, setFilterFeed, filterFeed }) {
  const handle = () => setFilterFeed([!filterFeed[0], !filterFeed[1]]);

  return (
    <button onClick={handle} className={active ? "active" : ""}>
      {text}
    </button>
  );
}

export default FeedFilter;
