import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoApp from "../src/components/TodoApp";
import "@testing-library/jest-dom/extend-expect";

test("TC1: Add a todo item", () => {
  render(<TodoApp />);
  fireEvent.change(screen.getByLabelText("Description:"), {
    target: { value: "Meeting" },
  });
  fireEvent.change(screen.getByLabelText("Date:"), {
    target: { value: "06.05.2024" },
  });
  fireEvent.click(screen.getByText("Add"));

  expect(screen.getByText("Meeting")).toBeInTheDocument();
});

test("TC2: Remove a todo item", () => {
  render(<TodoApp />);
  fireEvent.change(screen.getByLabelText("Description:"), {
    target: { value: "Meeting" },
  });
  fireEvent.change(screen.getByLabelText("Date:"), {
    target: { value: "06.05.2024" },
  });
  fireEvent.click(screen.getByText("Add"));
  fireEvent.click(screen.getByText("Delete"));
  expect(screen.getByText("No todos")).toBeInTheDocument();
});

test("TC3: Add a duplicate todo item", () => {
  // Mock the showModal method
  HTMLDialogElement.prototype.showModal = jest.fn();

  render(<TodoApp />);
  fireEvent.change(screen.getByLabelText("Description:"), {
    target: { value: "Meeting" },
  });
  fireEvent.change(screen.getByLabelText("Date:"), {
    target: { value: "06.05.2024" },
  });
  fireEvent.click(screen.getByText("Add"));
  fireEvent.change(screen.getByLabelText("Description:"), {
    target: { value: "Meeting" },
  });
  fireEvent.change(screen.getByLabelText("Date:"), {
    target: { value: "06.05.2024" },
  });
  fireEvent.click(screen.getByText("Add"));

  expect(screen.getByText("Meeting")).toBeInTheDocument();

  expect(
    screen.getByText(
      "The entry is identical with an existing todo. Do you want to keep it?"
    )
  ).toBeInTheDocument();
  expect(screen.getByText("Keep it")).toBeInTheDocument();
  expect(screen.getByText("Cancel")).toBeInTheDocument();
});

test("TC4: Confirm adding duplicate todo", () => {
  HTMLDialogElement.prototype.showModal = jest.fn();

  render(<TodoApp />);

  fireEvent.change(screen.getByLabelText("Description:"), {
    target: { value: "Meeting" },
  });
  fireEvent.change(screen.getByLabelText("Date:"), {
    target: { value: "06.05.2024" },
  });
  fireEvent.click(screen.getByText("Add"));

  fireEvent.change(screen.getByLabelText("Description:"), {
    target: { value: "Meeting" },
  });
  fireEvent.change(screen.getByLabelText("Date:"), {
    target: { value: "06.05.2024" },
  });
  fireEvent.click(screen.getByText("Add"));

  fireEvent.click(screen.getByText("Keep it"));
  const rows = screen.getAllByRole("row").length;
  expect(screen.getByText("Meeting")).toBeInTheDocument();

  expect(rows).toBeGreaterThanOrEqual(2);
});



