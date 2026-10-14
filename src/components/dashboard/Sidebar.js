
"use client";

const navigationItems = [
  { label: "Overview", icon: "◫" },
  { label: "Analytics", icon: "▥" },
  { label: "Users", icon: "♙" },
  { label: "Reports", icon: "▤" },
  { label: "AI Assistant", icon: "✳" },
];

export default function Sidebar({ activePage, onNavigate, open }) {
  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } flex min-h-screen shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-200`}
    >
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
          A
        </div>

        {open && (
          <span className="text-lg font-bold text-slate-900">
            Analytics AI
          </span>
        )}
      </div>

      <nav className="flex-1 space-y-2 p-3">
        {navigationItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.label)}
            title={open ? undefined : item.label}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
              activePage === item.label
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className="w-5 shrink-0 text-center text-lg">
              {item.icon}
            </span>

            {open && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-4 text-sm text-slate-500">
        {open ? "Dashboard v1.0" : "v1"}
      </div>
    </aside>
  );
}
