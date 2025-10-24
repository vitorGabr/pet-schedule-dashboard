// orval.config.ts
import { defineConfig } from "orval";

export default defineConfig({
	api: {
		input: { target: "http://localhost:3333/swagger/json" },
		output: {
			workspace: "./src/lib/http",
			target: "./generated/endpoints",
			schemas: "./generated/models",
			mode: "tags-split",
			client: "react-query",
			httpClient: "axios",
			namingConvention: "kebab-case",
			clean: true,
			biome: true,
			indexFiles: true,
			override: {
				mutator: { path: "../client-fetch.ts", name: "customFetch" },
				query: { useQuery: true, signal: false },
			},
		},
	},
	zod: {
		input: {
			target: "http://localhost:3333/swagger/json",
			override: {
				transformer: (openApiObject) => {
					function removePattern(obj) {
						if (Array.isArray(obj)) {
							obj.forEach(removePattern);
						} else if (obj && typeof obj === "object") {
							delete obj.pattern;
							Object.values(obj).forEach(removePattern);
						}
					}
					removePattern(openApiObject);
					return openApiObject;
				},
			},
		},
		output: {
			mode: "tags-split",
			workspace: "./src/lib/http",
			target: "./generated/zod",
			client: "zod",
			biome: true,
			namingConvention: "kebab-case",
			clean: true,
			indexFiles: true,
			override: {
				zod: {
					generate: {
						param: true,
						body: true,
						response: false,
						query: true,
						header: true,
					},
				},
			},
		},
	},
});
