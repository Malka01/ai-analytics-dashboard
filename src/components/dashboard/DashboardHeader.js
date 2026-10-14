
"use client";

export default function DashboardHeader({
  activePage,
  onToggleSidebar,
}) {
  return (
    <header className="flex min-h-16 flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-3 sm:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="rounded-lg border border-slate-200 px-3 py-2 text-slate-600 hover:bg-slate-100"
        >
          ☰
        </button>

        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {activePage}
          </h1>
          <p className="text-sm text-slate-500">
            Welcome back! Here&apos;s your business overview.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-slate-500 sm:inline">
          Admin
        </span>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
          AD
        </div>
      </div>
    </header>
  );
}
