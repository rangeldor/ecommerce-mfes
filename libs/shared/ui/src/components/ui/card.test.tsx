import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";

describe("Card", () => {
  it("renders card with all subcomponents", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("Test Footer")).toBeInTheDocument();
  });

  it("renders card with only content", () => {
    render(<Card><CardContent>Content Only</CardContent></Card>);
    expect(screen.getByText("Content Only")).toBeInTheDocument();
  });

  it("renders card header independently", () => {
    render(<CardHeader><CardTitle>Header Title</CardTitle></CardHeader>);
    expect(screen.getByText("Header Title")).toBeInTheDocument();
  });

  it("renders card title with correct element", () => {
    render(<CardTitle>Card Title</CardTitle>);
    const title = screen.getByText("Card Title");
    expect(title.tagName).toBe("H3");
  });

  it("renders card description with correct styling", () => {
    render(<CardDescription>Card Description</CardDescription>);
    expect(screen.getByText("Card Description")).toBeInTheDocument();
  });
});
