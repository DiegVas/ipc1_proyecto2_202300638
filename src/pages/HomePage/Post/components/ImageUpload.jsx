/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

function ImageUpload({ image, setImage }) {
  const fileInputRef = useRef();
  const [isDragOver, setIsDragOver] = useState(false);
  const [leaveDelay, setLeaveDelay] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const onDragOver = (event) => {
    event.preventDefault();
    clearTimeout(leaveDelay);
    if (!isDragOver) setIsDragOver(true);
  };

  const onDragEnter = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    setLeaveDelay(
      setTimeout(() => {
        setIsDragOver(false);
      }, 100)
    );
  };

  const onDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setIsDragOver(false);

    if (files[0] && files[0].type.startsWith("image/")) {
      setImage(files[0]);
      setImagePreview(URL.createObjectURL(files[0]));
    }
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
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

          {image && <img src={imagePreview} alt="Vista previa" />}
          {isDragOver && <p className="dropzone-text">Suelta la imagen</p>}
          {!image && !isDragOver && <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una imagen</p>}
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
