/* eslint-disable react/prop-types */
import "./Styles/Feed.css";
import "./Styles/Post.css";
import "./components/Post";
import Post from "./components/Post";
import Modal from "react-modal";
import Posts from "../Post/Posts";
import { useState } from "react";
import { UsePostContext, User } from "../Homepage";
import FeedFilter from "./components/FeedFilter";

Modal.setAppElement("#root");

export default function Feed() {
  const [filterFeed, setFilterFeed] = useState([true, false]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { postState } = UsePostContext();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="Feed">
      <nav>
        <FeedFilter text="Recientes" active={filterFeed[0]} setFilterFeed={setFilterFeed} filterFeed={filterFeed} />
        <FeedFilter text="Populares" active={filterFeed[1]} setFilterFeed={setFilterFeed} filterFeed={filterFeed} />
      </nav>
      {postState.map((post) => (
        <Post key={post.Uuid} {...post} User={User} />
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
