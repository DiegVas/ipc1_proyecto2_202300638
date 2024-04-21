/* eslint-disable react/prop-types */
import "./Styles/Posts.css";
import "./Styles/Modal.css";
import "./Styles/DropZone.css";
import { useState } from "react";
import HashtagInput from "./components/HashtagInput";
import ImageUpload from "./components/ImageUpload";
import { UsePostContext } from "../Homepage";
import Switch from "react-switch";
import { Base64 } from "js-base64";

const user = {
  Career: "Ingeniería en Sistemas",
  Carne: "202112345",
  Email: "usuario@gmail.com",
  Faculty: "Facultad de Ingeniería",
  Gender: "Femenino",
  LastName: "Pérez",
  Name: "María",
  Password: "ContraseñaSegura123",
  Uuid: "2c3eedf5-0daf-4993-95e6-39d26b9a36b6",
};
function Posts({ clseModal }) {
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

    let base64Image = image;
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function () {
        base64Image = reader.result;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }

    const newPost = {
      tweet: content,
      hashtags: hashtags,
      name: `${user.Name} ${user.LastName}`,
      career: user.Career,
      faculty: user.Faculty,
      date: new Date().toISOString(),
      image: base64Image,
      anonymous: isAnonymous,
      comment: [],
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
