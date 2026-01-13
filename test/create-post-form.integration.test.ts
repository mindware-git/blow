/// <reference lib="dom" />
import { test, expect, describe, mock, beforeEach } from "bun:test";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import {
  isBackendServerRunning,
  createTestProfile,
  trackCreatedPost,
  loadRealImageFile,
} from "./integration-test-utils";

// Mock the next/navigation router for integration tests
let mockPushCalls: string[] = [];
let mockRefreshCalls: number = 0;

const mockPush = (path: string) => {
  mockPushCalls.push(path);
  return Promise.resolve();
};

const mockRefresh = () => {
  mockRefreshCalls++;
  return Promise.resolve();
};

// Mock next/navigation module
const mockRouter = {
  push: mockPush,
  refresh: mockRefresh,
};

// Helper functions to reset and check mock calls
const resetMocks = () => {
  mockPushCalls = [];
  mockRefreshCalls = 0;
};

const getMockCalls = () => ({
  pushCalls: [...mockPushCalls],
  refreshCalls: mockRefreshCalls,
});

// Mock the module but don't mock the createPost function for integration tests
// We want to test the actual API call
mock.module("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

// Check if backend server is running
const serverRunning = await isBackendServerRunning();

if (!serverRunning) {
  console.log("⚠️  Backend server is not running. Skipping integration tests.");
  console.log("   To run integration tests, start the backend server with:");
  console.log("   cd api && uvicorn main:app --reload");
}

// Integration tests - only run when backend server is available
if (serverRunning) {
  describe("CreatePostForm Integration Tests", () => {
    beforeEach(() => {
      resetMocks();
    });

    test("creates post with text only via real API", async () => {
      // Create a test profile first
      const profileId = await createTestProfile();
      expect(profileId).toBeTruthy();

      const { CreatePostForm } = await import("@/components/create-post-form");

      render(React.createElement(CreatePostForm, { userEmail: profileId! }));

      const textInput = screen.getByPlaceholderText("What's on your mind?");
      const submitButton = screen.getByRole("button", { name: "Create Post" });

      // Fill in the form
      fireEvent.change(textInput, {
        target: { value: "Integration test post with text only" },
      });

      // Submit the form
      fireEvent.click(submitButton);

      // Wait for the API call to complete and check for success
      await waitFor(
        () => {
          // The form should be reset after successful submission
          expect(textInput).toHaveValue("");
          // Check that router was called
          const mockCalls = getMockCalls();
          expect(mockCalls.pushCalls).toContain("/");
          expect(mockCalls.refreshCalls).toBeGreaterThan(0);
        },
        { timeout: 15000 },
      );
    });

    test("creates post with text and image via real API", async () => {
      // Create a test profile first
      const profileId = await createTestProfile();
      expect(profileId).toBeTruthy();

      const { CreatePostForm } = await import("@/components/create-post-form");

      render(React.createElement(CreatePostForm, { userEmail: profileId! }));

      const textInput = screen.getByPlaceholderText("What's on your mind?");
      const imageInput = screen.getByLabelText("Images");
      const submitButton = screen.getByRole("button", { name: "Create Post" });

      // Create a mock image file
      const imageFile = new File(["test image content"], "test-image.jpg", {
        type: "image/jpeg",
      });

      // Fill in the form
      fireEvent.change(textInput, {
        target: { value: "Integration test post with image" },
      });

      // Simulate file input change
      Object.defineProperty(imageInput, "files", {
        value: [imageFile],
        writable: false,
      });
      fireEvent.change(imageInput);

      // Submit the form
      fireEvent.click(submitButton);

      // Wait for the API call to complete
      await waitFor(
        () => {
          // The form should be reset after successful submission
          expect(textInput).toHaveValue("");
          // Check that router was called
          const mockCalls = getMockCalls();
          expect(mockCalls.pushCalls).toContain("/");
          expect(mockCalls.refreshCalls).toBeGreaterThan(0);
        },
        { timeout: 15000 },
      );
    });

    test("shows error when submitting empty text", async () => {
      const profileId = await createTestProfile();
      expect(profileId).toBeTruthy();

      const { CreatePostForm } = await import("@/components/create-post-form");

      render(React.createElement(CreatePostForm, { userEmail: profileId! }));

      const submitButton = screen.getByRole("button", { name: "Create Post" });

      // Submit without entering any text
      fireEvent.click(submitButton);

      // Should show validation error immediately
      await waitFor(() => {
        expect(screen.getByText("내용을 입력해주세요.")).toBeInTheDocument();
      });
    });

    test("creates post with real image file via real API", async () => {
      // Create a test profile first
      const profileId = await createTestProfile();
      expect(profileId).toBeTruthy();

      // Load the real image file
      const realImageFile = await loadRealImageFile("public/logo-192x192.png");
      expect(realImageFile).toBeInstanceOf(File);
      expect(realImageFile.name).toBe("logo-192x192.png");
      expect(realImageFile.type).toBe("image/png");

      const { CreatePostForm } = await import("@/components/create-post-form");

      render(React.createElement(CreatePostForm, { userEmail: profileId! }));

      const textInput = screen.getByPlaceholderText("What's on your mind?");
      const imageInput = screen.getByLabelText("Images");
      const submitButton = screen.getByRole("button", { name: "Create Post" });

      // Fill in the form with real image
      fireEvent.change(textInput, {
        target: { value: "Integration test post with real logo image" },
      });

      // Simulate file input change with real image file
      Object.defineProperty(imageInput, "files", {
        value: [realImageFile],
        writable: false,
      });
      fireEvent.change(imageInput);

      // Submit the form
      fireEvent.click(submitButton);

      // Wait for the API call to complete
      await waitFor(
        () => {
          // The form should be reset after successful submission
          expect(textInput).toHaveValue("");
          // Check that router was called
          const mockCalls = getMockCalls();
          expect(mockCalls.pushCalls).toContain("/");
          expect(mockCalls.refreshCalls).toBeGreaterThan(0);
        },
        { timeout: 20000 }, // Longer timeout for real file upload
      );
    });
  });
}

// Additional test to verify server connectivity
test("backend server connectivity check", async () => {
  const isRunning = await isBackendServerRunning();

  if (isRunning) {
    console.log("✅ Backend server is running at http://localhost:8000");
  } else {
    console.log("❌ Backend server is not running");
  }

  // This test always passes - it's just for informational purposes
  expect(true).toBe(true);
});
