import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  it("renders with default variant", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Button variant="default">Default</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();

    rerender(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByRole("button", { name: /destructive/i })).toBeInTheDocument();

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button", { name: /outline/i })).toBeInTheDocument();

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button", { name: /secondary/i })).toBeInTheDocument();

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button", { name: /ghost/i })).toBeInTheDocument();

    rerender(<Button variant="link">Link</Button>);
    expect(screen.getByRole("button", { name: /link/i })).toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Button size="default">Default</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();

    rerender(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button", { name: /small/i })).toBeInTheDocument();

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button", { name: /large/i })).toBeInTheDocument();

    rerender(<Button size="icon">Icon</Button>);
    expect(screen.getByRole("button", { name: /icon/i })).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button", { name: /disabled/i })).toBeDisabled();
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /click me/i }));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
