/* eslint-disable react/prop-types */
import "./Styles/Feed.css";
import "./Styles/Post.css";
import { useState } from "react";
import "./Post";
import Post from "./Post";
import Modal from "react-modal";
import Posts from "../Post/Posts";

Modal.setAppElement("#root");
export default function Feed() {
  const [filterFeed, setFilterFeed] = useState([true, false]);

  const post = {
    name: "Nombre Apellido",
    career: "Carrera",
    faculty: "Facultad",
    date: new Date(),
    tweet: "Este es un tweet de ejemplo",
    hashtags: ["ejemplo", "react", "componente"],
    image: "https://aprende.guatemala.com/wp-content/uploads/2020/02/historia-escudo-usac-guatemala.jpg",
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

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
      <Post {...post} />
      <Post
        {...post}
        image="https://png.pngtree.com/background/20230613/original/pngtree-wallpaper-of-lions-in-space-picture-image_3428010.jpg"
      />
      <Post {...post} />
      <button className="fixed-btn" onClick={openModal}>
        +
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="FormModal">
        <Posts />
      </Modal>
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
