/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

function ImageUpload({ ImageChange }) {
  const fileInputRef = useRef();
  const [image, setImage] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDragEnter = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const onDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setImage(URL.createObjectURL(files[0]));
    ImageChange({ target: { files: [files[0]] } });
    setIsDragOver(false);
  };

  const onFileChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    ImageChange(event);
  };

  const onClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div>
        <div
          className={`dropzone ${isDragOver ? "dragover" : ""}`}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={onClick}
        >
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onFileChange} />
          <div style={{ position: "relative" }}>
            {image && <img src={image} alt="Vista previa" />}
            {isDragOver && <p style={{ position: "absolute", top: 0, left: 0, opacity: 0.5 }}>Deja la imagen aquí</p>}
            {!image && !isDragOver && <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una imagen</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
