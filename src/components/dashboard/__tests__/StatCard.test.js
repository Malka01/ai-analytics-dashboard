
import { render, screen } from "@testing-library/react";
import StatCard from "../StatCard";

describe("StatCard", () => {
  test("displays the metric title and value", () => {
    render(
      <StatCard
        title="Total Revenue"
        value="$48,250"
        change={12.5}
        description="vs. last period"
      />
    );

    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("$48,250")).toBeInTheDocument();

    const card = screen.getByText("Total Revenue").closest("article");

    expect(card).toHaveTextContent("+12.5%");
    expect(card).toHaveTextContent("vs. last period");
  });

  test("displays a negative change correctly", () => {
    render(
      <StatCard
        title="Total Orders"
        value="1,840"
        change={-2.4}
        description="vs. last period"
      />
    );

    const card = screen.getByText("Total Orders").closest("article");

    expect(card).toHaveTextContent("-2.4%");
  });
});
