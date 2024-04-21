/* eslint-disable react/prop-types */
import "./Styles/Feed.css";
import "./Styles/Post.css";
import { useState } from "react";
import "./Post";
import Post from "./Post";
import Modal from "react-modal";
import Posts from "../Post/Posts";
import { UsePostContext } from "../Homepage";

Modal.setAppElement("#root");

export default function Feed() {
  const [filterFeed, setFilterFeed] = useState([true, false]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { postState } = UsePostContext();

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="Feed">
      <nav>
        <FeedFilter text="Recientes" active={filterFeed[0]} setFilterFeed={setFilterFeed} filterFeed={filterFeed} />
        <FeedFilter text="Populares" active={filterFeed[1]} setFilterFeed={setFilterFeed} filterFeed={filterFeed} />
      </nav>
      {postState.map((post, index) => (
        <Post key={index} {...post} />
      ))}
      <button className="fixed-btn" onClick={openModal}>
        +
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="FormModal">
        <Posts clseModal={closeModal} />
      </Modal>
    </div>
  );
}
//tweet, hashtags, name, career, faculty, date, image
function FeedFilter({ text, active, setFilterFeed, filterFeed }) {
  const handle = () => setFilterFeed([!filterFeed[0], !filterFeed[1]]);

  return (
    <button onClick={handle} className={active ? "active" : ""}>
      {text}
    </button>
  );
}
