
import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "./features/preferences/preferencesSlice";
import { usersApi } from "./services/usersApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      preferences: preferencesReducer,
      [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(usersApi.middleware),
  });
};
