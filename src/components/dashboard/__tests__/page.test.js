
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "@/lib/features/preferences/preferencesSlice";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../../../app/page";
import { useGetUsersQuery } from "@/lib/services/usersApi";

jest.mock("@/lib/services/usersApi", () => ({
  useGetUsersQuery: jest.fn(),
}));

function renderDashboard() {
  const store = configureStore({
    reducer: {
      preferences: preferencesReducer,
      usersApi: (state = {}) => state,
    },
  });

  return render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

describe("Dashboard user search", () => {
  beforeEach(() => {
    useGetUsersQuery.mockReturnValue({
      data: [
        {
          id: 1,
          name: "Leanne Graham",
          email: "leanne@example.com",
          company: { name: "Romaguera-Crona" },
        },
        {
          id: 2,
          name: "Ervin Howell",
          email: "ervin@example.com",
          company: { name: "Deckow-Crist" },
        },
      ],
      isLoading: false,
      isError: false,
    });
  });

  test("filters users by name", () => {
    renderDashboard();

    fireEvent.change(screen.getByRole("searchbox", { name: /search users/i }), {
      target: { value: "Leanne" },
    });

    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.queryByText("Ervin Howell")).not.toBeInTheDocument();
  });

  test("shows a message when no users match", () => {
    renderDashboard();

    fireEvent.change(screen.getByRole("searchbox", { name: /search users/i }), {
      target: { value: "NoMatchingUser" },
    });

    expect(
      screen.getByText("No users match your search.")
    ).toBeInTheDocument();
  });
});
