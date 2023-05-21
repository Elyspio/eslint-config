import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";
import tsconfig from "../tsconfig.json";
import { UserConfig } from "vite";
import { convertPathToAlias } from "./internal.vite";
import vitePluginImport from "vite-plugin-babel-import";
import checker from "vite-plugin-checker";

export const getDefaultConfig = (basePath: string = __dirname): UserConfig => ({
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					// if (id.includes("node_modules/@mui")) return "mui.vendor";
					// if (id.includes("node_modules/react/" || "node_modules/react-dom/")) return "react.vendor";
					if (id.includes("node_modules")) return "vendor";
				},
			},
		},
	},
	plugins: [
		svgr(),
		react({
			tsDecorators: true,
		}),
		eslint({
			failOnWarning: false,
			fix: true,
			cache: false,
		}),
		vitePluginImport([
			{
				ignoreStyles: [],
				libraryName: "@mui/icons-material",
				libraryDirectory: "",
				libraryChangeCase: "pascalCase"
			},
			{
				ignoreStyles: [],
				libraryName: "@mui/material",
				libraryDirectory: "",
				libraryChangeCase: "pascalCase"
			},

		]),
		checker({
			// e.g. use TypeScript check
			typescript: true,
		}),
	],
	resolve: {
		alias: convertPathToAlias(tsconfig.compilerOptions.paths, basePath),
	},
	server: {
		port: 3000,
		host: "0.0.0.0",
	},
});

export * from "./internal.vite";
