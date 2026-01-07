import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:8000/openapi.json",
  output: "./types",
  client: "fetch",
  schemas: true,
  services: {
    asClass: true,
  },
  types: {
    enums: "typescript",
  },
});
