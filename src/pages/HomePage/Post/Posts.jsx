/* eslint-disable react/prop-types */
import "./Styles/Posts.css";
import "./Styles/Modal.css";
import "./Styles/DropZone.css";
import { useState } from "react";
import HashtagInput from "./components/HashtagInput";
import ImageUpload from "./components/ImageUpload";
import { UsePostContext } from "../Homepage";
import { useUser } from "../Homepage";
import Switch from "react-switch";

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

function Posts({ clseModal }) {
  const User = useUser();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [hashtags, setHashtags] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const { postState, setPostState } = UsePostContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("El tweet no puede estar vacío");
      return;
    }

    const base64 = image && (await convertBase64(image));

    const newPost = {
      tweet: content,
      hashtags: hashtags,
      name: `${User.Name} ${User.LastName}`,
      career: User.Career,
      faculty: User.Faculty,
      carne: User.Carne,
      date: new Date().toISOString(),
      image: base64,
      anonymous: isAnonymous,
      comments: [],
      likes: 0,
      commntesNumber: 0,
      likedBy: [],
    };

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el post");
      }

      const data = await response.json();
      setPostState([...postState, data]);
      clseModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post-form">
      <li className="post-header">
        <h1>Nueva Publicacion</h1>
        <div>
          <label>¿Anonimo?</label>
          <Switch
            checked={isAnonymous}
            onChange={setIsAnonymous}
            offColor="#808080"
            onColor="#5c8cae"
            height={20}
            width={48}
            uncheckedIcon={false}
            checkedIcon={false}
          />
        </div>
      </li>
      <form onSubmit={handleSubmit}>
        <li>
          <label>Contenido</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </li>
        <li>
          <ImageUpload image={image} setImage={setImage} />
        </li>
        <li>
          <label>Hashtags</label>
          <HashtagInput hashtags={hashtags} setHashtags={setHashtags} />
        </li>

        <button type="submit" className="post-button">
          Publicar
        </button>
      </form>
    </div>
  );
}

export default Posts;
