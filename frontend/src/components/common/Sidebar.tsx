import React from "react";

interface SidebarProps {
  onSelectModel: (model: string) => void;
}

export default function Sidebar({ onSelectModel }: SidebarProps) {
  const models = ["Product"]; // dynamicRouter ke models ke liye future me expand hoga

  return (
    <aside className="sidebar">
      <h3>Models</h3>
      <ul>
        {models.map((model) => (
          <li key={model} onClick={() => onSelectModel(model)}>
            {model}
          </li>
        ))}
      </ul>
    </aside>
  );
}
