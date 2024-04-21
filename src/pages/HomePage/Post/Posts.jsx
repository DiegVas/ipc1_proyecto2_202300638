import "./Styles/Posts.css";
import "./Styles/Modal.css";
import { useState } from "react";
import HashtagInput from "./components/HashtagInput";
import ImageUpload from "./components/ImageUpload";

function Posts() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  return (
    <div className="post-form">
      <h1>Nueva Publicacion</h1>
      <form onSubmit={handleSubmit}>
        <li>
          <label>Contenido</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="post-input post-textarea"
          />
        </li>
        <li>
          <ImageUpload ImageChange={handleImageChange} />
        </li>
        <li>
          <HashtagInput />
        </li>
        <button type="submit" className="post-button">
          Publicar
        </button>
      </form>
    </div>
  );
}

export default Posts;
