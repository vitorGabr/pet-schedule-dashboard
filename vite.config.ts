import tailwindcss from "@tailwindcss/vite";
import reactRouter from "@tanstack/router-plugin/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
