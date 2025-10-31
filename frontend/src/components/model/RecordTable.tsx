import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { fetchRecords, createRecord, deleteRecord, updateRecord } from "../utils/helpers";
import axiosClient from "../../api/axiosClinet";
import "./RecordTable.css";


interface RecordTableProps {
  model: string;
}

export default function RecordTable({ model }: RecordTableProps) {
  const [records, setRecords] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", price: "", ownerId: "" });
  const [editId, setEditId] = useState<number | null>(null); // 🆕 for editing

  useEffect(() => {
    loadRecords();
  }, [model]);

  async function loadRecords() {
    const data = await fetchRecords(model);
    setRecords(data);
  }

  async function addRecord(formData: any) {
    try {
      const res = await axiosClient.post("/product", formData);
      console.log("✅ Record added:", res.data);
    } catch (err: any) {
      console.error("❌ Error adding record:", err);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editId) {
      // 🆕 Update logic
      await updateRecord(model, editId, form);
      Swal.fire("✏️ Updated", "Record updated successfully", "success");
      setEditId(null);
    } else {
      // Existing add logic
      await createRecord(model, form);
      Swal.fire("✅ Success", "Record added successfully", "success");
    }

    setForm({ name: "", price: "", ownerId: "" });
    loadRecords();
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This record will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      await deleteRecord(model, id);
      Swal.fire("Deleted!", "Record deleted successfully.", "success");
      loadRecords();
    }
  };

  const handleEdit = (record: any) => {
    // 🆕 Populate form with record data
    setForm({
      name: record.name,
      price: record.price,
      ownerId: record.ownerId || "",
    });
    setEditId(record.id);
  };

  return (
    <div className="record-table">
      <h3>{model} Records</h3>

      <form onSubmit={handleSubmit} className="record-form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          placeholder="Owner ID"
          type="number"
          value={form.ownerId}
          onChange={(e) => setForm({ ...form, ownerId: e.target.value })}
        />
        <button type="submit">{editId ? "Update" : "Publish"}</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ name: "", price: "", ownerId: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Owner ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.price}</td>
              <td>{r.ownerId}</td>
              <td>
                <button onClick={() => handleEdit(r)}>✏️ Edit</button>
                <button onClick={() => handleDelete(r.id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
