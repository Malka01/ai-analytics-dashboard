
"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  setDateRange,
  toggleSidebar,
} from "@/lib/features/preferences/preferencesSlice";
import { useGetUsersQuery } from "@/lib/services/usersApi";

export default function Home() {
  const dispatch = useDispatch();

  const { dateRange, sidebarOpen } = useSelector(
    (state) => state.preferences
  );

  const {
    data: users,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetUsersQuery();

  return (
    <main className="min-h-screen bg-slate-100 p-8 text-slate-900">
      <h1 className="mb-6 text-3xl font-bold">
        AI Analytics Dashboard
      </h1>

      <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Dashboard Preferences
        </h2>

        <p className="mb-4">
          Selected date range: {dateRange}
        </p>

        <div className="mb-4 flex flex-wrap gap-3">
          <button
            className="rounded bg-blue-600 px-4 py-2 text-white"
            onClick={() => dispatch(setDateRange("30days"))}
          >
            Last 30 days
          </button>

          <button
            className="rounded bg-slate-700 px-4 py-2 text-white"
            onClick={() => dispatch(toggleSidebar())}
          >
            Toggle sidebar
          </button>
        </div>

        <p>Sidebar: {sidebarOpen ? "Open" : "Closed"}</p>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Users API
        </h2>

        {isLoading && <p>Loading users...</p>}

        {isError && (
          <p className="text-red-600">
            Failed to load users. Please try again.
            {error?.status === "FETCH_ERROR" &&
              " Check your internet connection."}
          </p>
        )}

        {isSuccess && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <article
                key={user.id}
                className="rounded-lg border border-slate-200 p-4"
              >
                <h3 className="font-semibold">{user.name}</h3>
                <p className="mt-1 text-sm text-slate-600">
                  {user.email}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  {user.company.name}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
