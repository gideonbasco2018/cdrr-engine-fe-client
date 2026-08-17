// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/dashboard", end: true },
  { label: "My Applications", to: "/applications", end: true },
  { label: "New Application", to: "/applications/new", end: false },
  { label: "Documents", to: "/documents", end: true },
  { label: "Company Profile", to: "/profile", end: true },
];

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 h-full bg-surface border-r border-line flex flex-col overflow-y-auto">
      <nav className="flex-1 px-3 py-6 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              [
                "block rounded-md px-3 py-2.5 text-sm font-medium border-l-2 transition-colors",
                isActive
                  ? "border-gold bg-forest/5 text-forest"
                  : "border-transparent text-ink/70 hover:bg-ink/5 hover:text-ink",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-line">
        <p className="font-mono text-[10px] text-ink/40">cdrr-db.fda.gov.ph</p>
      </div>
    </aside>
  );
}
