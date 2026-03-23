import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders badge with children", () => {
    render(<Badge>Badge Content</Badge>);
    expect(screen.getByText("Badge Content")).toBeInTheDocument();
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Badge variant="default">Default</Badge>);
    expect(screen.getByText("Default")).toBeInTheDocument();

    rerender(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText("Secondary")).toBeInTheDocument();

    rerender(<Badge variant="destructive">Destructive</Badge>);
    expect(screen.getByText("Destructive")).toBeInTheDocument();

    rerender(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline")).toBeInTheDocument();
  });

  it("renders as a div element", () => {
    render(<Badge>Badge</Badge>);
    expect(screen.getByText("Badge").tagName).toBe("DIV");
  });
});
