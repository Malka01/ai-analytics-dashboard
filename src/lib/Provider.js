/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";

export default function ReduxProvider({ children }) {
  const [store, setStore] = useState(null);

  useEffect(() => {
    setStore(makeStore());
  }, []);

  if (!store) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return <Provider store={store}>{children}</Provider>;
}
