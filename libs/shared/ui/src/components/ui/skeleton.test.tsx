import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders skeleton element", () => {
    render(<Skeleton />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toBeInTheDocument();
  });

  it("renders with default class", () => {
    render(<Skeleton />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("animate-pulse");
  });

  it("accepts className prop", () => {
    render(<Skeleton className="custom-skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("custom-skeleton");
  });

  it("renders with custom height and width via className", () => {
    render(<Skeleton className="h-8 w-32" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("h-8", "w-32");
  });
});
