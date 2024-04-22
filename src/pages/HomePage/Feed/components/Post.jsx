/* eslint-disable react/prop-types */

import "../Styles/Post.css";
import "../Styles/Post_Comments.css";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";

export default function Post({
  tweet,
  hashtags,
  career,
  faculty,
  date,
  image,
  anonymous,
  Uuid,
  likes,
  likedBy,
  comments,
  User,
  name,
}) {
  const [likesState, setLikesState] = useState(0);
  const [liked, setLiked] = useState(false);
  const [commentState, setCommentState] = useState([]);
  const [currentComment, setCurrentComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    const getRandomPastelColor = () => {
      const hue = Math.floor(Math.random() * 360);
      const saturation = 80 + Math.random() * 20;
      const lightness = 85 + Math.random() * 15;
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };
    setLikesState(likes);
    setCommentState(comments);
    setLiked(likedBy.includes(User.Uuid));

    setBackgroundColor(getRandomPastelColor());
  }, [User.Uuid, likedBy, likes, comments, commentState]);

  const postStyle = {
    backgroundColor: backgroundColor,
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${Uuid}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ liked, userUuid: User.Uuid }),
      });
      if (!response.ok) throw new Error("Error al dar like al post");
      setLikesState(liked ? likesState - 1 : likesState + 1);
      setLiked(!liked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${Uuid}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: currentComment, username: User.Name }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el comentario");
      }

      const trimmedComment = currentComment.trim();

      if (!trimmedComment) {
        alert("El comentario no puede estar vacío");
        return;
      }

      setCommentState([...commentState, { username: User.Name, text: trimmedComment }]);
      setCurrentComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
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
            <p>{!anonymous ? name : "Usuario Anonimo"}</p>
            <p>{new Date(date).toLocaleDateString()}</p>
          </div>
          <p>{!anonymous ? `${career} (${faculty})` : "Universidad de San Carlos de Guatemala"}</p>
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
            {liked ? <FaHeart /> : <FaRegHeart />} {likesState}
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
        <section>
          {commentState.map((commentIn, index) => (
            <p key={index}>
              <strong>{commentIn.username}:</strong> {commentIn.text}
            </p>
          ))}
        </section>
      </div>
    </div>
  );
}
