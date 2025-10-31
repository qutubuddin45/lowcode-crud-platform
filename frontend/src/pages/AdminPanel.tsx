import React, { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import RecordTable from "../components/model/RecordTable";

export default function AdminPanel() {
  const [selectedModel, setSelectedModel] = useState("Product");

  return (
    <div className="admin-panel">
      <Sidebar onSelectModel={setSelectedModel} />
      <main className="content">
        <RecordTable model={selectedModel} />
      </main>
    </div>
  );
}
