import React, { useState } from "react";
import "../styles/ContactUs.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
    console.log(formData);
  };

  return (
    <div className="ContactUs">
      <h1>Contacto</h1>
      <p>Si tienes alguna pregunta, comentario o sugerencia, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Correo electrónico:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Mensaje:
          <textarea name="message" value={formData.message} onChange={handleChange} required />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
