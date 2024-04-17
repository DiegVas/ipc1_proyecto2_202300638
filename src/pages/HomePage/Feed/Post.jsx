/* eslint-disable react/prop-types */

import "./Styles/Post.css";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";

export default function Post({ tweet, hashtags, name, career, faculty, date, image }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-user">
          <p>{name}</p>
          <p>{new Date(date).toLocaleDateString()}</p>
        </div>
        <p>
          {career} ({faculty})
        </p>
      </div>
      <section className="post-body">
        <p>{tweet}</p>
        {image && <img src={image} alt="Post" />}
        <nav className="post-hashtags">
          {hashtags.map((hashtag, index) => (
            <span key={index}>#{hashtag} </span>
          ))}
        </nav>
      </section>
      <nav>
        <button onClick={() => alert("Ingresar comentario")}>
          <AiFillMessage />
          Comentar
        </button>
        <button onClick={handleLike} className={liked ? "like" : ""}>
          {liked ? <FaHeart /> : <FaRegHeart />} {likes}
        </button>
      </nav>
    </div>
  );
}
