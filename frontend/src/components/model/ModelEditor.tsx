import React, { useState } from "react";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../utils/constants";

interface ModelEditorProps {
  modelName: string;
  onCreated: () => void;
}

export default function ModelEditor({ modelName, onCreated }: ModelEditorProps) {
  const [form, setForm] = useState({ name: "", price: "", ownerId: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE_URL}/${modelName.toLowerCase()}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      Swal.fire("Success!", `${modelName} created successfully!`, "success");
      setForm({ name: "", price: "", ownerId: "" });
      onCreated();
    } else {
      Swal.fire("Error!", "Failed to create record.", "error");
    }
  };

  return (
    <form className="model-editor" onSubmit={handleSubmit}>
      <h3>Add New {modelName}</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} required />
      <input name="ownerId" placeholder="Owner ID" type="number" value={form.ownerId} onChange={handleChange} />
      <button type="submit">Publish</button>
    </form>
  );
} 
