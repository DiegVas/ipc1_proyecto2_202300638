/* eslint-disable react/prop-types */

import "./Styles/Post.css";
import "./Styles/Post_Comments.css";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";

export default function Post({ tweet, hashtags, name, career, faculty, date, image }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    const getRandomPastelColor = () => {
      const hue = Math.floor(Math.random() * 360);
      const saturation = 80 + Math.random() * 20; // 80-100
      const lightness = 85 + Math.random() * 15; // 85-100
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    setBackgroundColor(getRandomPastelColor());
  }, []);

  const postStyle = {
    backgroundColor: backgroundColor,
  };

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleCommentSubmit = () => {
    setComments([...comments, { username: name, text: currentComment }]);
    setCurrentComment("");
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    console.log("Show comments: ", showComments);
  };

  const handleInputChange = (e) => {
    const lines = e.target.value.split("\n");
    if (lines.length > 3) {
      lines.pop();
      console.log("Max 3 lines");
    }
    setCurrentComment(lines.join("\n"));
  };

  return (
    <div className="post">
      <div className="post-body" style={postStyle}>
        <div className="post-header">
          <div className="post-user">
            <p>{name}</p>
            <p>{new Date(date).toLocaleDateString()}</p>
          </div>
          <p>
            {career} ({faculty})
          </p>
        </div>
        <section className="post-section">
          <p>{tweet}</p>
          {image && <img src={image} alt="Post" />}
          <nav className="post-hashtags">
            {hashtags.map((hashtag, index) => (
              <span key={index}>#{hashtag} </span>
            ))}
          </nav>
        </section>
        <nav>
          <button onClick={toggleComments}>
            <AiFillMessage />
            Comentar
          </button>
          <button onClick={handleLike} className={liked ? "like" : ""}>
            {liked ? <FaHeart /> : <FaRegHeart />} {likes}
          </button>
        </nav>
      </div>
      <div className={`comments${showComments ? " show" : ""}`}>
        <div className="input-section">
          <textarea
            rows="3"
            maxLength="200"
            value={currentComment}
            onChange={handleInputChange}
            placeholder="Escribe tu comentario aquí..."
          />
          <button onClick={handleCommentSubmit}>Enviar comentario</button>
        </div>
        <div>
          {comments.map((comment, index) => (
            <p key={index}>
              <strong>{comment.username}:</strong> {comment.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
