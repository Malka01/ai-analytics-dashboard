
"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateRange,
  toggleSidebar,
} from "@/lib/features/preferences/preferencesSlice";
import { useGetUsersQuery } from "@/lib/services/usersApi";

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";

export default function Home() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const { dateRange, sidebarOpen } = useSelector(
    (state) => state.preferences
  );

  const [activePage, setActivePage] = useState("Overview");

  const {
    data: users,
    isLoading,
    isError,
  } = useGetUsersQuery();

  const filteredUsers = (users ?? []).filter((user) => {
  const query = searchTerm.toLowerCase();

  return (
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  );
});

  return (
    <main className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        open={sidebarOpen}
      />

      <div className="min-w-0 flex-1">
        <DashboardHeader
          activePage={activePage}
          onToggleSidebar={() => dispatch(toggleSidebar())}
        />

        <div className="space-y-6 p-5 sm:p-8">
          <section className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">
                Business Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Monitor your business performance.
              </p>
            </div>

            <select
              aria-label="Date range"
              value={dateRange}
              onChange={(event) =>
                dispatch(setDateRange(event.target.value))
              }
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
            </select>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Revenue"
              value="$48,250"
              change={12.5}
              description="vs. last period"
            />

            <StatCard
              title="Total Users"
              value="2,420"
              change={8.2}
              description="vs. last period"
            />

            <StatCard
              title="Total Orders"
              value="1,840"
              change={-2.4}
              description="vs. last period"
            />

            <StatCard
              title="Conversion Rate"
              value="3.62%"
              change={4.6}
              description="vs. last period"
            />
          </section>

          
          <RevenueChart dateRange={dateRange} />

          {/* <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">
              Users API
            </h2>

            {isLoading && <p>Loading users...</p>}

            {isError && (
              <p className="text-red-600">
                Unable to load users. Please try again later.
              </p>
            )}

            {users && (
              <div className="divide-y divide-slate-100">
                {users.slice(0, 5).map((user) => (
                  <div
                    key={user.id}
                    className="flex flex-wrap justify-between gap-2 py-3"
                  >
                    <span className="font-medium">{user.name}</span>
                    <span className="text-sm text-slate-500">
                      {user.email}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section> */}
          
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-sm text-slate-500">
          Search users by name or email
          </p>
          </div>

          <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search users..."
          aria-label="Search users"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm sm:w-64"
          />
          </div>

          {isLoading && <p>Loading users...</p>}

          {isError && (
          <p role="alert" className="text-red-600">
          Unable to load users. Please try again later.
          </p>
          )}

          {!isLoading && !isError && filteredUsers.length === 0 && (
          <p className="py-6 text-center text-slate-500">
          No users match your search.
          </p>
          )}

          {!isLoading && !isError && filteredUsers.length > 0 && (
          <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-3 py-3 font-medium">Name</th>
              <th className="px-3 py-3 font-medium">Email</th>
              <th className="px-3 py-3 font-medium">Company</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-3 py-3 font-medium">{user.name}</td>
                <td className="px-3 py-3 text-slate-600">{user.email}</td>
                <td className="px-3 py-3 text-slate-600">
                  {user.company.name}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
          </div>
          )}
          </section>

        </div>
      </div>
    </main>
  );
}
