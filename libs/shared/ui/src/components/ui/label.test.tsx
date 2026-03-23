import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "./label";

describe("Label", () => {
  it("renders label with children", () => {
    render(<Label>Label Text</Label>);
    expect(screen.getByText("Label Text")).toBeInTheDocument();
  });

  it("associates with input via htmlFor", () => {
    render(
      <>
        <Label htmlFor="input-id">Email</Label>
        <input id="input-id" type="email" />
      </>
    );
    
    const label = screen.getByText("Email");
    const input = screen.getByRole("textbox");
    
    expect(label).toHaveAttribute("for", "input-id");
    expect(input).toHaveAttribute("id", "input-id");
  });

  it("accepts className prop", () => {
    render(<Label className="custom-class">Label</Label>);
    expect(screen.getByText("Label")).toHaveClass("custom-class");
  });
});
