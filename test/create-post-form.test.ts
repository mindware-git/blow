/// <reference lib="dom" />
import { test, expect, mock } from "bun:test";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

// Mock the next/navigation router
const mockPush = mock(() => Promise.resolve());
const mockRefresh = mock(() => Promise.resolve());

mock.module("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

// Mock the createPost function
const mockCreatePost = mock(
  async (text: string, files: File[], userEmail: string) => {
    return {
      post: {
        id: "test-post-id",
        text,
        profile_id: userEmail,
        media_urls: [],
        created_at: new Date().toISOString(),
      },
      error: null,
    };
  },
);

mock.module("@/lib/user", () => ({
  createPost: mockCreatePost,
}));

// Simple test first
test("basic test works", () => {
  expect(2 + 2).toBe(4);
});

test("can import CreatePostForm", async () => {
  const { CreatePostForm } = await import("@/components/create-post-form");
  expect(CreatePostForm).toBeDefined();
});

test("renders CreatePostForm component", async () => {
  const { CreatePostForm } = await import("@/components/create-post-form");

  render(
    React.createElement(CreatePostForm, { userEmail: "thisvalidemailid" }),
  );

  expect(screen.getByText("Create a new post")).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText("What's on your mind?"),
  ).toBeInTheDocument();
  expect(screen.getByLabelText("Images")).toBeInTheDocument();
  expect(screen.getByLabelText("Videos")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Create Post" }),
  ).toBeInTheDocument();
});

test("shows error when submitting empty text", async () => {
  const { CreatePostForm } = await import("@/components/create-post-form");

  render(
    React.createElement(CreatePostForm, { userEmail: "thisvalidemailid" }),
  );

  const submitButton = screen.getByRole("button", { name: "Create Post" });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("내용을 입력해주세요.")).toBeInTheDocument();
  });
});

test("submits form with text successfully", async () => {
  const { CreatePostForm } = await import("@/components/create-post-form");

  render(
    React.createElement(CreatePostForm, { userEmail: "thisvalidemailid" }),
  );

  const textInput = screen.getByPlaceholderText("What's on your mind?");
  const submitButton = screen.getByRole("button", { name: "Create Post" });

  fireEvent.change(textInput, { target: { value: "Test post content" } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockCreatePost).toHaveBeenCalledWith(
      "Test post content",
      [],
      "thisvalidemailid",
    );
    expect(mockPush).toHaveBeenCalledWith("/");
    expect(mockRefresh).toHaveBeenCalled();
  });
});

test("submits form with text and files", async () => {
  const { CreatePostForm } = await import("@/components/create-post-form");

  render(
    React.createElement(CreatePostForm, { userEmail: "thisvalidemailid" }),
  );

  const textInput = screen.getByPlaceholderText("What's on your mind?");
  const imageInput = screen.getByLabelText("Images");
  const submitButton = screen.getByRole("button", { name: "Create Post" });

  // Create mock files
  const file1 = new File(["test"], "test.jpg", { type: "image/jpeg" });
  const file2 = new File(["test"], "test.png", { type: "image/png" });

  fireEvent.change(textInput, { target: { value: "Test post with images" } });

  // Simulate file input change
  Object.defineProperty(imageInput, "files", {
    value: [file1, file2],
    writable: false,
  });

  fireEvent.change(imageInput);
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockCreatePost).toHaveBeenCalledWith(
      "Test post with images",
      [file1, file2],
      "thisvalidemailid",
    );
    expect(mockPush).toHaveBeenCalledWith("/");
    expect(mockRefresh).toHaveBeenCalled();
  });
});

test("handles API error", async () => {
  // Mock createPost to return an error
  mockCreatePost.mockImplementationOnce(async () => ({
    post: null,
    error: "Failed to create post",
  }));

  const { CreatePostForm } = await import("@/components/create-post-form");

  render(
    React.createElement(CreatePostForm, { userEmail: "thisvalidemailid" }),
  );

  const textInput = screen.getByPlaceholderText("What's on your mind?");
  const submitButton = screen.getByRole("button", { name: "Create Post" });

  fireEvent.change(textInput, { target: { value: "Test post" } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("Failed to create post")).toBeInTheDocument();
  });
});

test("shows loading state during submission", async () => {
  // Mock createPost to be slow
  mockCreatePost.mockImplementationOnce(async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return {
      post: {
        id: "test-post-id",
        text: "Test post",
        profile_id: "thisvalidemailid",
        media_urls: [],
        created_at: new Date().toISOString(),
      },
      error: null,
    };
  });

  const { CreatePostForm } = await import("@/components/create-post-form");

  render(
    React.createElement(CreatePostForm, { userEmail: "thisvalidemailid" }),
  );

  const textInput = screen.getByPlaceholderText("What's on your mind?");
  const submitButton = screen.getByRole("button", { name: "Create Post" });

  fireEvent.change(textInput, { target: { value: "Test post" } });
  fireEvent.click(submitButton);

  // Check loading state
  expect(
    screen.getByRole("button", { name: "Creating..." }),
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Creating..." })).toBeDisabled();

  // Wait for completion
  await waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
