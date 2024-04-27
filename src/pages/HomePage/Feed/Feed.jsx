/* eslint-disable react/prop-types */
import "./Styles/Feed.css";
import "./Styles/Post.css";
import "./components/Post";
import Post from "./components/Post";
import Modal from "react-modal";
import Posts from "../Post/Posts";
import { useState } from "react";
import { UsePostContext, useUser } from "../Homepage";
import FeedFilter from "./components/FeedFilter";

Modal.setAppElement("#root");

export default function Feed() {
  const User = useUser();
  const [filterFeed, setFilterFeed] = useState([true, false]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { postState } = UsePostContext();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="Feed">
      <nav>
        <FeedFilter text="Populares" active={filterFeed[1]} setFilterFeed={setFilterFeed} filterFeed={filterFeed} />
        <FeedFilter text="Recientes" active={filterFeed[0]} setFilterFeed={setFilterFeed} filterFeed={filterFeed} />
      </nav>
      {filterFeed[0] ? RecentFeed(postState, User) : PopularFeed(postState, User)}
      <button className="fixed-btn" onClick={openModal}></button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="FormModal">
        <Posts clseModal={closeModal} />
      </Modal>
    </div>
  );
}

function RecentFeed(postState, User) {
  return postState.map((post) => <Post key={post.Uuid} {...post} User={User} />);
}

function PopularFeed(postState, User) {
  return [...postState].sort((a, b) => b.likes - a.likes).map((post) => <Post key={post.Uuid} {...post} User={User} />);
}
